import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';

// Off-chain data storage for analytics
import { client } from '../lib/sanityClient';

import { contractABI, contractAddress } from '../contracts/constants';

export const TransactionContext = React.createContext();

let eth;

if (typeof window !== 'undefined') {
  eth = window.ethereum;
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const code = provider.getCode(contractAddress);

  console.log('code', code);
  console.log('signer', signer);

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
  });

  /**
   * Trigger loading modal
   */
  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`);
    } else {
      router.push(`/`);
    }
  }, [isLoading]);

  /**
   * Create user profile in Sanity
   */
  useEffect(() => {
    if (!currentAccount) return;
    const setUser = async () => {
      const userDoc = {
        _type: 'users',
        _id: currentAccount,
        userName: 'Unnamed',
        address: currentAccount,
      };

      await client.createIfNotExists(userDoc);
    };

    setUser();
  }, [currentAccount]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  /**
   * Checks if MetaMask is installed and an account is connected
   * @param {*} metamask Injected MetaMask code from the browser
   * @returns
   */
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ');

      const accounts = await metamask.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      // throw new Error('No ethereum object.');
    }
  };

  /**
   * Prompts user to connect their MetaMask wallet
   * @param {*} metamask Injected MetaMask code from the browser
   */
  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ');

      const accounts = await metamask.request({
        method: 'eth_requestAccounts',
      });

      console.log('accounts', accounts[0]);

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      // throw new Error('No ethereum object.');
    }
  };

  /**
   * Saves transaction to Sanity DB
   * @param {string} txHash Transaction hash
   * @param {number} amount Amount of ETH that was sent
   * @param {string} fromAddress Sender address
   * @param {string} toAddress Recipient address
   * @returns null
   */
  const saveTransaction = async (
    txHash,
    amount,
    fromAddress = currentAccount,
    toAddress
  ) => {
    const txDoc = {
      _type: 'transactions',
      _id: txHash,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamp: new Date(Date.now()).toISOString(),
      txHash: txHash,
      amount: parseFloat(amount),
    };

    await client.createIfNotExists(txDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ transactions: [] })
      .insert('after', 'transactions[-1]', [
        {
          _key: txHash,
          _ref: txHash,
          _type: 'reference',
        },
      ])
      .commit();

    return;
  };

  /**
   * Executes a transaction
   * @param {*} metamask Injected MetaMask code from the browser
   * @param {string} currentAccount Current user's address
   */
  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try {
      if (!metamask) return alert('Please install metamask ');
      const { addressTo, amount } = formData;
      const transactionContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      console.log('connectedAccount', connectedAccount);
      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40', // 520000 Gwei
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        'TRANSFER'
      );

      setIsLoading(true);

      await transactionHash.wait();

      await saveTransaction(
        transactionHash.hash,
        amount,
        connectedAccount,
        addressTo
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

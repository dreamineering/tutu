import { NETWORKS } from '@drmg/shared/data-access/scaffold-eth';
import { DEBUG } from '../../../config/app.config';

import { useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import { transactor } from '@drmg/shared/ui'; // functions
import { EthComponentsSettingsContext } from '@drmg/shared/ui'; // models

import {
  useBalance,
  useBlockNumber,
  useContractReader,
  useEthersAdaptorFromProviderOrSigners,
  useGasPrice,
  useSignerAddress,
} from '@drmg/shared/ui';

import { useEthersContext } from '@drmg/shared/ui';
import { mergeDefaultUpdateOptions } from '@drmg/shared/ui';

import { getNetworkInfo } from '../../../functions';
import { useAppContracts } from '../../contractContext';
import { IScaffoldAppProviders } from './useScaffoldAppProviders';

/**
 * Logs to console current app state.  Shows you examples on how to use hooks!
 *
 * @param scaffoldAppProviders
 * @param currentEthersUser
 * @param readContracts
 * @param writeContracts
 * @param mainnetContracts
 */
export const useScaffoldHooksExamples = (
  scaffoldAppProviders: IScaffoldAppProviders
): void => {
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const ethersContext = useEthersContext();
  const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);

  const exampleMainnetProvider = scaffoldAppProviders.mainnetAdaptor?.provider;
  const currentChainId: number | undefined = ethersContext.chainId;

  // ---------------------
  // 🏦 get your balance
  // ---------------------
  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const [yourLocalBalance] = useBalance(ethersContext.account);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(
    exampleMainnetProvider
  );
  const [yourMainnetBalance, yUpdate, yStatus] = useBalance(
    ethersContext.account,
    mergeDefaultUpdateOptions(),
    {
      adaptorEnabled: true,
      adaptor: mainnetAdaptor,
    }
  );

  // you can change the update schedule to every 10 blocks, the default is every 1 block:
  const [secondbalance] = useBalance(ethersContext.account, {
    blockNumberInterval: 10,
  });
  // you can change the update schedule to every polling, min is 10000ms
  const [thirdbalance] = useBalance(ethersContext.account, {
    refetchInterval: 100000,
    blockNumberInterval: undefined,
  });
  // you can use advanced react-query update options
  const [fourthbalance] = useBalance(ethersContext.account, {
    blockNumberInterval: 1,
    query: { refetchOnWindowFocus: true },
  });

  // ---------------------
  // 🤙🏽 calling an external function
  // ---------------------

  // 💰 Then read your DAI balance like:
  const [myAddress] = useSignerAddress(ethersContext.signer);
  const myMainnetDAIBalance = useContractReader(
    mainnetDai,
    mainnetDai?.balanceOf,
    [myAddress ?? '']
  );

  // 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation
  const [gasPrice] = useGasPrice(
    ethersContext.chainId,
    'fast',
    getNetworkInfo(ethersContext.chainId)
  );

  // ---------------------
  // 📛 call ens
  // ---------------------
  // const [addressFromENS] = useResolveEnsName(scaffoldAppProviders.mainnetAdaptor?.provider, 'austingriffith.eth');
  // console.log('🏷 Resolved austingriffith.eth as:', addressFromENS);

  // ---------------------
  // 🔁 onBlock or on polling
  // ---------------------
  // This hook will let you invoke a callback on every block or with a polling time!
  // 🙋🏽‍♂️ on block is preffered!
  useBlockNumber(scaffoldAppProviders.mainnetAdaptor?.provider, (blockNumber) =>
    console.log(`⛓ A new mainnet block is here: ${blockNumber}`)
  );

  useBlockNumber(scaffoldAppProviders.localAdaptor?.provider, (blockNumber) =>
    console.log(`⛓ A new local block is here: ${blockNumber}`)
  );

  // ----------------------
  // ✍🏽 writing to contracts
  // ----------------------
  // The transactor wraps transactions and provides notificiations
  // you can use this for read write transactions
  // check out faucetHintButton.tsx for an example.
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  useEffect(() => {
    if (
      DEBUG &&
      scaffoldAppProviders.mainnetAdaptor &&
      ethersContext.account &&
      currentChainId &&
      yourLocalBalance
    ) {
      console.log(
        '_____________________________________ 🏗 scaffold-eth _____________________________________'
      );
      console.log('🌎 mainnetProvider', scaffoldAppProviders.mainnetAdaptor);
      console.log(
        '🏠 localChainId',
        scaffoldAppProviders?.localAdaptor?.chainId
      );
      console.log('👩‍💼 selected address:', ethersContext.account);
      console.log('🕵🏻‍♂️ currentChainId:', currentChainId);
      console.log(
        '💵 yourLocalBalance',
        yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : '...'
      );
      // console.log('💵 yourMainnetBalance', yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : '...');
      console.log('🌍 DAI contract on mainnet:', mainnetDai);
      console.log('💵 yourMainnetDAIBalance', myMainnetDAIBalance ?? '...');
      console.log('⛽ gasPrice', gasPrice);
    }
  }, [
    scaffoldAppProviders.mainnetAdaptor,
    ethersContext.account,
    ethersContext.provider,
  ]);
};

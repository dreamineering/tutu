// IMPORT CONSTANTS
import { NETWORKS, ALCHEMY_KEY } from '../constants';
const initialNetwork = NETWORKS.localhost;

// IMPORT CONTRACTS
import externalContracts from '../contracts/external_contracts';
// contracts
import deployedContracts from '../contracts/hardhat_contracts.json';


import 'antd/dist/antd.css';
import { Button, Col, Row } from 'antd';

import { useCallback, useEffect, useState } from 'react';
import dynamic from "next/dynamic";

import ethers from 'ethers';

// const useBalance = dynamic(() => import("eth-hooks"));

import {
  useBalance,
  // useContractLoader,
  // useContractReader,
  // useGasPrice,
  // useOnBlock,
  // useUserProviderAndSigner,
} from '@drmg/shared/ui';


import { useStaticJsonRPC } from '../hooks';

const providers = [
  'https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406',
  `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
  'https://rpc.scaffoldeth.io:48544',
];

const networkOptions = [initialNetwork.name, 'mainnet', 'rinkeby'];

export function New() {
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]); //set initial to local

  const targetNetwork = NETWORKS[selectedNetwork];

  console.log('NETWORKS', NETWORKS);
  console.log('TARGET_NETWORK', targetNetwork);
  console.log('ALCHEMY_KEY', ALCHEMY_KEY);

  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER
    ? process.env.REACT_APP_PROVIDER
    : targetNetwork.rpcUrl,
  ]);

  console.log('LOCAL_PROVIDER', localProvider);


  const mainnetProvider = useStaticJsonRPC(providers);


  const yourLocalBalance = useBalance(localProvider, address);

  // // Just plug in different 🛰 providers to get your balance on different chains:
  // const yourMainnetBalance = useBalance(mainnetProvider, address);



  console.log('externalContracts', externalContracts);
  console.log('deployedContracts', deployedContracts);

  // balances
  // console.log('yourLocalBalance', yourLocalBalance);

  return (
    <div className="text-lg">
      <div>new</div>
      <Button
        onClick={() => {
          window.open('https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA');
        }}
        size="large"
        shape="round"
      >
        <span style={{ marginRight: 8 }} role="img" aria-label="support">
          💬
        </span>
        Support
      </Button>
    </div>
  );
}

export default New;

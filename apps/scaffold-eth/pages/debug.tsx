// IMPORT and SET CONSTANTS
import { NETWORKS, ALCHEMY_KEY } from '../constants';
// import { NETWORKS, ALCHEMY_KEY } from '@drmg/shared/data-access/scaffold-eth';

// import {
//   BURNER_FALLBACK_ENABLED,
//   MAINNET_PROVIDER,
// } from '../config/app.config';
import externalContracts from '../contracts/external_contracts';
import deployedContracts from '../contracts/hardhat_contracts.json';
const initialNetwork = NETWORKS.localhost;

// STYLING
import 'antd/dist/antd.css';
import { Button, Col, Row } from 'antd';

// REACT
import { useCallback, useEffect, useState } from 'react';

// WEB3
import ethers from 'ethers';

// shared library hooks
import {
  asEthersAdaptor,
  useBalance, // good
  useContractLoader,
  useContractReader,
  useDexEthPrice,
  useEthersAppContext,
  useEventListener,
  // useGasPrice,
  // useOnBlock,
  // useUserProviderAndSigner,
  //useEventListener  v4
  //  useDexEthPrice
  //
} from '@drmg/shared/ui'; // hooks
// local hooks
import { useStaticJsonRPC } from '../hooks';

import { useScaffoldProviders as useScaffoldAppProviders } from '../components/main/hooks/useScaffoldAppProviders';

import {
  useAppContracts,
  useConnectAppContracts,
  useLoadAppContracts,
} from '../components/contractContext';

import { MainPageHeader, MainPageFooter } from '../components/main';
import { GenericContract } from '../components/generic-contract';

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

  // console.log('NETWORK-CONSTANTS', NETWORKS);
  console.log('TARGET_NETWORK', targetNetwork);
  console.log('ALCHEMY_KEY', ALCHEMY_KEY);

  // DEPLOYED CONTRACTS
  console.log('EXTERNAL_CONTRACTS', externalContracts);
  console.log('DEPLOYED_CONTRACTS', deployedContracts);

  // const contractConfig = {
  //   deployedContracts: deployedContracts || {},
  //   externalContracts: externalContracts || {},
  // };

  // const yourContract = useAppContracts('YourContract', ethersContext.chainId);

  // LOCAL PROVIDER
  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER
      ? process.env.REACT_APP_PROVIDER
      : targetNetwork.rpcUrl,
  ]);
  console.log('LOCAL_PROVIDER', localProvider);
  const yourLocalBalance = useBalance(localProvider, address);
  console.log('LOCAL_BALANCE', yourLocalBalance);

  // MAINNET PROVIDER
  const mainnetProvider = useStaticJsonRPC(providers);
  console.log('MAINNET_PROVIDER', mainnetProvider);
  const yourMainnetBalance = useBalance(mainnetProvider, address);
  console.log('MAINNET_BALANCE', yourMainnetBalance);

  // app hooks
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();
  const ethersAppContext = useEthersAppContext();

  useLoadAppContracts();
  // 🏭 connec to  contracts for current network & signer
  useConnectAppContracts(asEthersAdaptor(ethersAppContext));

  const [ethPrice] = useDexEthPrice(
    scaffoldAppProviders.mainnetAdaptor?.provider,
    scaffoldAppProviders.targetNetwork
  );

  // init contracts
  const yourContract = useAppContracts(
    'YourContract',
    ethersAppContext.chainId
  );
  // const yourNFT = useAppContracts('YourNFT', ethersAppContext.chainId);
  // const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);

  // keep track of a variable from the contract in the local React state:
  const [purpose, update] = useContractReader(
    yourContract,
    yourContract?.purpose,
    [],
    yourContract?.filters.SetPurpose()
  );

  // 📟 Listen for broadcast events
  const [setPurposeEvents] = useEventListener(yourContract, 'SetPurpose', 0);

  return (
    <div className="text-lg">
      <MainPageHeader
        scaffoldAppProviders={scaffoldAppProviders}
        price={ethPrice}
      />
      <div>Debug Contract</div>
      <GenericContract
        contractName="YourContract"
        contract={yourContract}
        mainnetAdaptor={scaffoldAppProviders.mainnetAdaptor}
        blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
      />
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
      <MainPageFooter
        scaffoldAppProviders={scaffoldAppProviders}
        price={ethPrice}
      />
    </div>
  );
}

export default New;

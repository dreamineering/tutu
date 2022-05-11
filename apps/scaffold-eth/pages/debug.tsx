import {
  BURNER_FALLBACK_ENABLED,
  MAINNET_PROVIDER,
} from '../config/app.config';
import { Button } from 'antd';

// shared library hooks
import {
  asEthersAdaptor,
  useBalance,
  useContractReader,
  useDexEthPrice,
  useEthersAppContext,
  useEventListener,
} from '@drmg/shared/ui'; // hooks

import { useScaffoldProviders as useScaffoldAppProviders } from '../components/main/hooks/useScaffoldAppProviders';

import {
  useAppContracts,
  useConnectAppContracts,
  useLoadAppContracts,
} from '../components/contractContext';

import { MainPageHeader, MainPageFooter } from '../components/main';
import { GenericContract } from '../components/generic-contract';
import { useBurnerFallback } from '../components/main/hooks/useBurnerFallback';
import { useScaffoldHooksExamples } from '../components/main/hooks/useScaffoldHooksExamples';

export function New() {
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();

  // 🦊 Get your web3 ethers context from current providers
  const ethersAppContext = useEthersAppContext();

  // if no user is found use a burner wallet on localhost as fallback if enabled
  useBurnerFallback(scaffoldAppProviders, true);

  useLoadAppContracts();
  // 🏭 connec to  contracts for current network & signer
  useConnectAppContracts(asEthersAdaptor(ethersAppContext));

  // -----------------------------
  // Hooks use and examples
  // -----------------------------
  // 🎉 Console logs & More hook examples:
  // 🚦 disable this hook to stop console logs
  // 🏹🏹🏹 go here to see how to use hooks!
  useScaffoldHooksExamples(scaffoldAppProviders);

  // -----------------------------
  // These are the contracts!
  //

  // init contracts
  const yourContract = useAppContracts(
    'YourContract',
    ethersAppContext.chainId
  );
  // const yourNFT = useAppContracts('YourNFT', ethersAppContext.chainId);
  // const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);
  console.log('YOUR_CONTRACT', yourContract);

  // keep track of a variable from the contract in the local React state:
  const [purpose, update] = useContractReader(
    yourContract,
    yourContract?.purpose,
    [],
    yourContract?.filters.SetPurpose()
  );

  // 📟 Listen for broadcast events
  const [setPurposeEvents] = useEventListener(yourContract, 'SetPurpose', 0);

  // 💵 This hook will get the price of ETH from 🦄 Uniswap:
  const [ethPrice] = useDexEthPrice(
    scaffoldAppProviders.mainnetAdaptor?.provider,
    scaffoldAppProviders.targetNetwork
  );

  // 💰 this hook will get your balance
  const [yourCurrentBalance] = useBalance(ethersAppContext.account);

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

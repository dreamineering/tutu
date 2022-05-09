// IMPORT and SET CONSTANTS
// import { NETWORKS, ALCHEMY_KEY } from '../constants';
// import { NETWORKS, ALCHEMY_KEY } from '@drmg/shared/data-access/scaffold-eth';
import { useScaffoldProviders as useScaffoldAppProviders } from '../components/main/hooks/useScaffoldAppProviders';

// local shared function
import { getNetworkInfo } from '../functions/getNetworkInfo';

import { useEthersContext, useDexEthPrice, useGasPrice } from '@drmg/shared/ui'; // hooks
import { Account, Faucet, GasGauge, Wallet } from '@drmg/shared/ui'; // components

// local components
import {
  FaucetHintButton,
  getFaucetAvailable,
} from '../components/common/FaucetHintButton';

export function EthComponents() {
  const ethersContext = useEthersContext();
  const network = getNetworkInfo(ethersContext.chainId);

  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();
  const localSigner = scaffoldAppProviders.localAdaptor?.signer;

  // Faucet Tx can be used to send funds from the faucet
  const faucetAvailable = getFaucetAvailable(
    scaffoldAppProviders,
    ethersContext
  );

  // FAUCET
  const [ethPrice] = useDexEthPrice(
    scaffoldAppProviders.mainnetAdaptor?.provider,
    scaffoldAppProviders.targetNetwork
  );

  // FAUCET HINT
  const [gasPrice] = useGasPrice(
    ethersContext.chainId,
    'fast',
    getNetworkInfo(ethersContext.chainId)
  );

  return (
    <div className="text-lg">
      <h1>Eth Components</h1>
      <h2>Gas Gauge</h2>
      <GasGauge
        chainId={scaffoldAppProviders.targetNetwork.chainId}
        currentNetwork={network}
        provider={ethersContext.provider}
        speed="average"
      />
      <h2>Faucet</h2>
      faucet available? {faucetAvailable}
      {
        /*  if the local provider has a signer, let's show the faucet:  */
        faucetAvailable &&
        scaffoldAppProviders?.mainnetAdaptor &&
        scaffoldAppProviders?.localAdaptor ? (
          <Faucet
            localAdaptor={scaffoldAppProviders.localAdaptor}
            price={ethPrice}
            mainnetAdaptor={scaffoldAppProviders.mainnetAdaptor}
          />
        ) : (
          <></>
        )
      }
      <h2>Account</h2>
      <Account
        createLoginConnector={scaffoldAppProviders.createLoginConnector}
        ensProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
        price={ethPrice}
        blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
        hasContextConnect={true}
      />
      <h2>Address</h2>
      <h2>Address Input</h2>
      <h2>Balance</h2>
      <h2>Blockie</h2>
      <h2>Ether Input</h2>
      <h2>Punk Blockie</h2>
      <h2>Wallet</h2>
      <p>Wallet is a dependency Faucet </p>
      <Wallet
        color="#888888"
        signer={localSigner}
        localProvider={scaffoldAppProviders.localAdaptor?.provider}
        ensProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
        price={ethPrice}
      />
      <h1>Local Components</h1>
    </div>
  );
}

export default EthComponents;

// IMPORT and SET CONSTANTS
import { NETWORKS, ALCHEMY_KEY } from '../constants';
// import { NETWORKS, ALCHEMY_KEY } from '@drmg/shared/data-access/scaffold-eth';

import { useEthersContext, GasGauge } from '@drmg/shared/ui';
import { useScaffoldProviders as useScaffoldAppProviders } from '../components/local/main/hooks/useScaffoldAppProviders';

import { getNetworkInfo } from '../functions/getNetworkInfo';

// import copy of eth-components
// import { Faucet, GasGauge } from '../components/eth';
// import { Faucet, GasGauge } from '../components/eth';

export function EthComponents() {
  const ethersContext = useEthersContext();

  // app hooks
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();

  const network = getNetworkInfo(ethersContext.chainId);

  return (
    <div className="text-lg">
      <GasGauge
        chainId={scaffoldAppProviders.targetNetwork.chainId}
        currentNetwork={network}
        provider={ethersContext.provider}
        speed="average"
      />
    </div>
  );
}

export default EthComponents;

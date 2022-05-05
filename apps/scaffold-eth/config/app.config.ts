// CONSTANTS
import { NETWORKS, TNetworkNames } from '@drmg/shared/data-access/scaffold-eth';

import { invariant } from 'ts-invariant';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

// LOCAL ETH HOOKS
import { TNetworkInfo, TEthersProvider } from '@drmg/shared/ui';

export const DEBUG = true;

// https://www.npmjs.com/package/ts-invariant
// invariant.log('MODE', process.env.MODE, process.env.SCAFFOLD_APP_DEV);

/** ******************************
 * TARGET NETWORK CONFIG: 📡 What chain are your contracts deployed to?
 ****************************** */

/**
 * This constant is your target network that the app is pointed at
 * 🤚🏽  Set your target frontend network <--- select your target frontend network(localhost, rinkeby, xdai, mainnet)
 */

const targetNetwork: TNetworkNames = process.env
  .TARGET_NETWORK as TNetworkNames;
// const targetNetwork: string =
//   process.env.TARGET_NETWORK;

invariant.log('TARGET_NETWORK', targetNetwork);
invariant(
  NETWORKS[targetNetwork] != null,
  `Invalid target network: ${targetNetwork}`
);

console.log('targetNetwork', targetNetwork);
console.log(
  'NEXT_PUBLIC_TARGET_NETWORK---',
  process.env.NEXT_PUBLIC_TARGET_NETWORK
);

export const TARGET_NETWORK_INFO: TNetworkInfo = NETWORKS[targetNetwork];
// export const TARGET_NETWORK_INFO: TNetworkInfo = NETWORKS['localhost'];

if (DEBUG) console.log(`📡 Connecting to ${TARGET_NETWORK_INFO.name}`);

/** ******************************
 * APP CONFIG:
 ****************************** */
/**
 * localhost faucet enabled
 */
export const FAUCET_ENABLED =
  process.env.SCAFFOLD_APP_FAUCET_ALLOWED === 'true' && process.env.DEV;
/**
 * Use burner wallet as fallback
 */
export const BURNER_FALLBACK_ENABLED =
  process.env.SCAFFOLD_APP_BURNER_FALLBACK_ALLOWED === 'true' &&
  process.env.SCAFFOLD_APP_DEV;
/**
 * Connect to burner on first load if there are no cached providers
 */
export const CONNECT_TO_BURNER_AUTOMATICALLY =
  process.env.SCAFFOLD_APP_CONNECT_TO_BURNER_AUTOMATICALLY === 'true' &&
  process.env.SCAFFOLD_APP_DEV;

if (DEBUG)
  invariant.log(
    `DEV: ${process.env.DEV}`,
    `SCAFFOLD_APP_FAUCET_ALLOWED: ${process.env.SCAFFOLD_APP_FAUCET_ALLOWED}`,
    `SCAFFOLD_APP_BURNER_FALLBACK_ALLOWED: ${process.env.SCAFFOLD_APP_BURNER_FALLBACK_ALLOWED}`,
    `SCAFFOLD_APP_CONNECT_TO_BURNER_AUTOMATICALLY: ${process.env.SCAFFOLD_APP_CONNECT_TO_BURNER_AUTOMATICALLY}`
  );

if (DEBUG)
  invariant.log(
    `FAUCET_ENABLED: ${FAUCET_ENABLED}`,
    `BURNER_FALLBACK_ENABLED: ${BURNER_FALLBACK_ENABLED}`,
    `CONNECT_TO_BURNER_AUTOMATICALLY: ${CONNECT_TO_BURNER_AUTOMATICALLY}`
  );

export const SUBGRAPH_URI =
  'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract';

/** ******************************
 * OTHER FILES
 ****************************** */

/**
 * See web3ModalConfig.ts to setup your wallet connectors
 */

/**
 * See appContractsConfig.ts for your contract configuration
 */

/**
 * see apiKeysConfig.ts for your api keys
 */

/** ******************************
 * PROVIDERS CONFIG
 ****************************** */

// -------------------
// Connecting to mainnet
// -------------------
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
const mainnetScaffoldEthProvider = new StaticJsonRpcProvider(
  process.env.SCAFFOLD_RPC_MAINNET
);
const mainnetInfura = new StaticJsonRpcProvider(
  `${process.env.SCAFFOLD_RPC_MAINNET_INFURA}/${process.env.SCAFFOLD_KEY_INFURA}`
);
// const mainnetProvider = new InfuraProvider("mainnet",import.meta.env.VITE_KEY_INFURA);

// 🚊 your mainnet provider
export const MAINNET_PROVIDER = mainnetScaffoldEthProvider;

// -------------------
// connecting to local provider
// -------------------
if (DEBUG) console.log('🏠 Connecting to provider:', NETWORKS.localhost.url);
export const LOCAL_PROVIDER: TEthersProvider | undefined =
  TARGET_NETWORK_INFO === NETWORKS.localhost && process.env.DEV
    ? new StaticJsonRpcProvider(NETWORKS.localhost.url)
    : undefined;

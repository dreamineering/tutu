import * as dotenv from 'dotenv';

import type { HardhatUserConfig } from 'hardhat/config';

import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan'; //
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import 'solidity-coverage';
import '@appliedblockchain/chainlink-plugins-fund-link';

// import '@tenderly/hardhat-tenderly';
// import 'hardhat-watcher';                         // missing
// import '@primitivefi/hardhat-dodoc';              // missing
// import 'hardhat-tracer';                          // missing
// import '@nomiclabs/hardhat-solhint';

import {
  hardhatNamedAccounts,
  getNetworks,
} from './libs/shared/data-access/scaffold-eth/src';

// Tasks
import './libs/ethereum/src/tasks';
import { getMnemonic } from './libs/ethereum/src/tasks/functions/mnemonic';

// import { receiveMessageOnPort } from 'worker_threads';

dotenv.config();

// key set with Windows $env:WALLET_PK = '0x...'
console.log('WALLET_PK_FOR_POLYGON_DEPLOY', process.env.WALLET_PK);

//#region   scaffold eth

/**
 * loads network list and config from scaffold-common
 */
// const networks = {
//   ...getNetworks({
//     accounts: {
//       mnemonic: getMnemonic(),
//     },
//   }),
//   localhost: {
//     url: 'http://localhost:8545',
//     /*
//       if there is no mnemonic, it will just use account 0 of the hardhat node to deploy
//       (you can put in a mnemonic here to set the deployer locally)
//     */
//     // accounts: {
//     //   mnemonic: getMnemonic(),
//     // },
//   },
// };

/**
 * See {@link hardhatNamedAccounts} to define named accounts
 */
const namedAccounts = hardhatNamedAccounts as {
  [name: string]:
    | string
    | number
    | { [network: string]: null | number | string };
};

//#endregion

const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  process.env.ALCHEMY_MAINNET_RPC_URL ||
  'https://eth-mainnet.alchemyapi.io/v2/your-api-key';

const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL ||
  'https://eth-rinkeby.alchemyapi.io/v2/your-api-key';

const KOVAN_RPC_URL =
  process.env.KOVAN_RPC_URL ||
  'https://eth-kovan.alchemyapi.io/v2/your-api-key';

const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL ||
  'https://polygon-mainnet.alchemyapi.io/v2/your-api-key';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
// optional
const MNEMONIC = process.env.MNEMONIC || 'Your mnemonic';
const FORKING_BLOCK_NUMBER = process.env.FORKING_BLOCK_NUMBER;

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || 'Your etherscan API key';
const POLYGONSCAN_API_KEY =
  process.env.POLYGONSCAN_API_KEY || 'Your polygonscan API key';

const config: HardhatUserConfig = {
  // scaffold-eth
  // preprocess: {
  //   eachLine: removeConsoleLog(
  //     (hre) =>
  //       hre.network.name !== 'hardhat' && hre.network.name !== 'localhost'
  //   ),
  // },

  defaultNetwork: 'hardhat',
  // defaultNetwork: process.env.HARDHAT_TARGET_NETWORK, // scaffold-eth

  namedAccounts: namedAccounts, // scaffold-eth

  // networks: networks, // scaffold-eth
  paths: {
    root: './libs/ethereum/src',
    // sources: './libs/ethereum/src/contracts',
    // tests: './libs/ethereum/src/test',
    cache: './generated/cache',
    artifacts: './generated/artifacts',
    deployments: './generated/deployments',
  },
  typechain: {
    outDir: './generated/typechain', // NOTE: scaffold-eth has this as conttract-types
    target: 'ethers-v5',
  },

  // watcher: {
  //   'auto-compile': {
  //     tasks: ['compile'],
  //     files: ['./contracts'],
  //     verbose: false,
  //   },
  // },
  networks: {
    hardhat: {
      // If you want to do some forking set `enabled` to true
      // forking: {
      //   url: MAINNET_RPC_URL,
      //   blockNumber: Number(FORKING_BLOCK_NUMBER),
      //   enabled: false,
      // },
      chainId: 31337,
    },
    // localhost: {
    //   chainId: 31337,
    // },
    // kovan: {
    //   url: KOVAN_RPC_URL,
    //   accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    //   //accounts: {
    //   //     mnemonic: MNEMONIC,
    //   // },
    //   saveDeployments: true,
    //   chainId: 42,
    // },
    // rinkeby: {
    //   url: RINKEBY_RPC_URL,
    //   accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    //   //   accounts: {
    //   //     mnemonic: MNEMONIC,
    //   //   },
    //   saveDeployments: true,
    //   chainId: 4,
    // },
    // mainnet: {
    //   url: MAINNET_RPC_URL,
    //   accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    //   //   accounts: {
    //   //     mnemonic: MNEMONIC,
    //   //   },
    //   saveDeployments: true,
    //   chainId: 1,
    // },

    // mumbai: {
    //   url: 'https://rpc-mumbai.matic.today',
    //   accounts: [process.env.WALLETPK],
    //   chainId: 80001,
    // },

    // polygon: {
    //   url: POLYGON_MAINNET_RPC_URL,
    //   accounts: PRIVATE_KEY !== undefined ? [process.env.WALLET_PK] : [],
    //   saveDeployments: true,
    //   chainId: 137,
    // },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      kovan: ETHERSCAN_API_KEY,
      // polygon: POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    runOnCompile: false,
    only: [
      'APIConsumer',
      'KeepersCounter',
      'PriceConsumerV3',
      'RandomNumberConsumer',
    ],
  },
  // namedAccounts: {
  //   deployer: {
  //     default: 0, // here this will by default take the first account as deployer
  //     1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
  //   },
  //   feeCollector: {
  //     default: 1,
  //   },
  // },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
      },
      {
        version: '0.6.6',
      },
      {
        version: '0.4.24',
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};

export default config;

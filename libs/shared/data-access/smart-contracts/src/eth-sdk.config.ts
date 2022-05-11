import { defineConfig } from '@dethcrypto/eth-sdk';

export default defineConfig({
  contracts: {
    mainnet: {
      dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
  },
});

// import { defineConfig } from '@dethcrypto/eth-sdk';

// import { contractsByNetworkName } from './src/functions';

// console.log(contractsByNetworkName);

// export default defineConfig({
//   contracts: contractsByNetworkName,
//   outputPath: './src/lib/external-contracts/',
// });

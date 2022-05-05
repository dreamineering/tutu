// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  env: {
    APP_DEV: process.env.APP_DEV,
    TARGET_NETWORK: process.env.TARGET_NETWORK,
    FAUCET_ENABLED: process.env.FAUCET_ENABLED,
    BURNER_FALLBACK_ALLOWED: process.env.BURNER_FALLBACK_ALLOWED,
    CONNECT_TO_BURNER_AUTOMATICALLY:
      process.env.CONNECT_TO_BURNER_AUTOMATICALLY,
    RPC_MAINNET: process.env.RPC_MAINNET,
    RPC_MAINNET_INFURA: process.env.RPC_MAINNET_INFURA,
    KEY_INFURA: process.env.KEY_INFURA,
    RINKEBY_RPC_URL: process.env.RINKEBY_RPC_URL,
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

module.exports = withNx(nextConfig);

import '../assets/main.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { EthersAppContext } from '@drmg/shared/ui';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to defi-dex!</title>
      </Head>
      <main className="app">
        <EthersAppContext>
          <Component {...pageProps} />
        </EthersAppContext>
      </main>
    </>
  );
}

export default CustomApp;

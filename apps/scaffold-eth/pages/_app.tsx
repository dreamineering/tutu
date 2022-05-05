import '../assets/chrome-bug.css';
import '../assets/main.css';

import Head from 'next/head';

import { EthersAppContext } from '@drmg/shared/ui';
import { ContractsAppContext } from '../context/contractContext';

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Welcome to scaffold-eth!</title>
      </Head>
      <main className="">
        <ContractsAppContext>
          <EthersAppContext>
            <Component {...pageProps} />
          </EthersAppContext>
        </ContractsAppContext>
      </main>
    </>
  );
}

export default CustomApp;

import '../assets/chrome-bug.css';
import '../assets/main.css';

import { Suspense } from 'react';
import Head from 'next/head';

import { EthersAppContext } from '@drmg/shared/ui';

import { ContractsAppContext } from '../context/contractContext';
import {
  ErrorBoundary,
  ErrorFallback,
} from '../components/typescript/common/ErrorFallback';

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Welcome to scaffold-eth!</title>
      </Head>
      <main className="">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ContractsAppContext>
            <EthersAppContext>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div />}>
                  <Component {...pageProps} />
                </Suspense>
              </ErrorBoundary>
            </EthersAppContext>
          </ContractsAppContext>
        </ErrorBoundary>
      </main>
    </>
  );
}

export default CustomApp;

import '../assets/chrome-bug.css';
import '../assets/main.css';

// setup themes for theme switcher
const themes = {
  dark: '../assets/dark-theme.css',
  light: './assets/light-theme.css',
};
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
// load saved theme
// const savedTheme = window.localStorage.getItem('theme');

import { Suspense } from 'react';
import Head from 'next/head';

import { EthersAppContext } from '@drmg/shared/ui';

import { ContractsAppContext } from '../components/contractContext';
import {
  ErrorBoundary,
  ErrorFallback,
} from '../components/common/ErrorFallback';

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
                <ThemeSwitcherProvider themeMap={themes} defaultTheme={'light'}>
                  <Suspense fallback={<div />}>
                    <Component {...pageProps} />
                  </Suspense>
                </ThemeSwitcherProvider>
              </ErrorBoundary>
            </EthersAppContext>
          </ContractsAppContext>
        </ErrorBoundary>
      </main>
    </>
  );
}

export default CustomApp;

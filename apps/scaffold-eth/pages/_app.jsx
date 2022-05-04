import '../assets/chrome-bug.css';
import '../assets/main.css';

import Head from 'next/head';

// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// const themes = {
//   dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
//   light: `${process.env.PUBLIC_URL}/light-theme.css`,
// };

// const prevTheme = window.localStorage.getItem('theme');

// const subgraphUri =
//   'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract';

// const client = new ApolloClient({
//   uri: subgraphUri,
//   cache: new InMemoryCache(),
// });

// (
//   <ApolloProvider client={client}>
//     <ThemeSwitcherProvider
//       themeMap={themes}
//       defaultTheme={prevTheme || 'light'}
//     >
//       <BrowserRouter>
//         <App subgraphUri={subgraphUri} />
//       </BrowserRouter>
//     </ThemeSwitcherProvider>
//   </ApolloProvider>
// ),
function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Welcome to scaffold-eth!</title>
      </Head>
      <main className="">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;

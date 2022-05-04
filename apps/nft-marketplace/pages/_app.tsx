import '../assets/chrome-bug.css';
import '../assets/main.css';

import { AppProps } from 'next/app';
import Link from 'next/link';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to nft-marketplace!</title>
      </Head>
      <main className="app">
        <nav className="border-b p-6">
          <p className="text-4xl font-bold">Metaverse Marketplace</p>
          <div className="flex mt-4">
            <Link href="/">
              <a className="mr-4 text-pink-500">Home</a>
            </Link>
            <Link href="/create-nft">
              <a className="mr-6 text-pink-500">Sell NFT</a>
            </Link>
            <Link href="/my-nfts">
              <a className="mr-6 text-pink-500">My NFTs</a>
            </Link>
            <Link href="/dashboard">
              <a className="mr-6 text-pink-500">Dashboard</a>
            </Link>
          </div>
        </nav>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;

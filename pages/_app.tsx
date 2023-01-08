import type { AppProps } from 'next/app';

import Head from 'next/head';

import './globals.css';
import { AccountProvider, WebSocketProvider } from 'providers';

export default function App({ Component, pageProps }: AppProps) {
  const { user } = pageProps;

  return (
    <>
      <Head>
        <meta name="description" content="A simple messenger application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountProvider user={user}>
        <WebSocketProvider>
          <Component {...pageProps} />
        </WebSocketProvider>
      </AccountProvider>
    </>
  );
}

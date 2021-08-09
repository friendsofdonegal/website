import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import React from "react";
import Head from "next/head";
import Script from "next/script";

export type WithPagesLayout<
  TUnknown extends { Component: NextComponentType<NextPageContext> },
  IP = unknown,
  P = unknown
> = TUnknown & {
  Component: NextComponentType<NextPageContext, IP, P> & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
  };
};

function MyApp({ Component, pageProps }: WithPagesLayout<AppProps>) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  return getLayout(
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;

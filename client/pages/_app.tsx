import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
export default withTRPC({
  ssr: true, // https://trpc.io/docs/ssr
  config() {
    return process.browser
      ? {
          // client request, no SSR
          url: API_URL,
        }
      : {
          // TODO: figure out why we get an ECONNREFUSED error when connecting
          url: API_URL,
          headers: {
            "x-ssr": "1", // inform server that this is an ssr request
          },
        };
  },
})(App);

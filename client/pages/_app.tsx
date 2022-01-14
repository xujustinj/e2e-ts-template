import { withTRPC } from "@trpc/next";
// import config from "@xujustinj/common-config"; // TODO
import type { AppProps } from "next/app";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

const SERVER_URL = process.env["SERVER_URL"]!;
export default withTRPC({
  ssr: true, // https://trpc.io/docs/ssr
  config() {
    return process.browser
      ? {
          // client request, no SSR
          url: SERVER_URL,
        }
      : {
          url: SERVER_URL,
          headers: {
            "x-ssr": "1", // inform server that this is an ssr request
          },
        };
  },
})(App);

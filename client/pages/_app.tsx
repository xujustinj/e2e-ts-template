import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// When server-side rendering, if we want the Next server to send API requests
// to a different URL, then SSR_API_URL exists to override API_URL.
// The main use case for this is in Docker, when the API server is accessible to
// the browser at localhost, but this server is running in another container and
// must be referred to by its Docker network alias from other containers such as
// the one running Next.
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const SSR_API_URL = process.env.SSR_API_URL;
export default withTRPC({
  ssr: true, // https://trpc.io/docs/ssr
  config() {
    return process.browser
      ? {
          // client request, no SSR
          url: API_URL,
        }
      : {
          url: SSR_API_URL ?? API_URL,
          headers: {
            "x-ssr": "1", // inform server that this is an ssr request
          },
        };
  },
})(App);

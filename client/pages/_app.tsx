import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC({
  config() {
    return {
      url: "http://localhost:8080", // TODO: make this configurable
    };
  },
})(App);

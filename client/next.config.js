/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    // polling needed for hot reloading, according to https://dev.to/kumareth/next-js-docker-made-easy-2bok
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

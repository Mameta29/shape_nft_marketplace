const withEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

module.exports = withEnv();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'ipfs.infura.io',
      'api.pinata.cloud',
      'gateway.pinata.cloud',
    ],
  },
};

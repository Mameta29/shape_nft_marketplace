require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');

/** @type import('hardhat/config').HardhatUserConfig */

const {
  ALCHEMY_GOERLI_URL,
  PRIVATE_KEY,
  // ETHERSCAN_KEY,
} = process.env;
module.exports = {
  solidity: '0.8.4',
  networks: {
    goerli: {
      url: ALCHEMY_GOERLI_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    // mainnet: {
    //   url: MAINNET_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
  },
  // etherscan: {
  //   apiKey: ETHERSCAN_KEY,
  // },
};

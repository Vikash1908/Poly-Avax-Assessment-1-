require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/VaW-94LhoyDc3BBIIfzmzXTmjbTZErj-',
      accounts: [process.env.PRIVATE_KEY]
    },
    amoy: {
      url: 'https://rpc-amoy.polygon.technology',
      accounts: [process.env.PRIVATE_KEY],
    },
  }
};
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';
import "@nomiclabs/hardhat-ethers";
import 'hardhat-gas-reporter';
import '@typechain/hardhat';
import 'solidity-coverage';
import "@nomiclabs/hardhat-etherscan";

import * as dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY
    }
  },
  networks: {
    mainnet: {
      chainId: 1,
      url: process.env.MAINNET_PROVIDER || "",
      accounts: process.env.MAINNET_DEPLOYER_PRIVATE_KEY
        ? [process.env.MAINNET_DEPLOYER_PRIVATE_KEY]
        : [],
    },
    goerli: {
      chainId: 5,
      url: process.env.GOERLI_PROVIDER || "",
      accounts: process.env.GOERLI_DEPLOYER_PRIVATE_KEY
        ? [process.env.GOERLI_DEPLOYER_PRIVATE_KEY]
        : [],
    },
    sepolia: {
      chainId: 11155111,
      url: process.env.SEPOLIA_PROVIDER || "",
      accounts: process.env.SEPOLIA_DEPLOYER_PRIVATE_KEY
        ? [process.env.SEPOLIA_DEPLOYER_PRIVATE_KEY]
        : [],
    },
  }
};

export default config;

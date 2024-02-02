import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';
import 'solidity-coverage';

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    localhost: { timeout: 600000 },
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === 'true' ? true : false,
    gasPrice: 1,
    showTimeSpent: true,
    noColors: true,
    outputFile: 'reports/gas/summary.txt',
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  mocha: {
    timeout: 600000,
  },
};

export default config;

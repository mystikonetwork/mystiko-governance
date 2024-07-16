import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
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
    version: '0.8.26',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
        details: {
          yul: true,
        },
      },
    },
  },
  mocha: {
    timeout: 600000,
  },
};

export default config;

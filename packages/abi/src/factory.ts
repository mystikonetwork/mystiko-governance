import { providers, Signer } from 'ethers';
import {
  ERC20,
  ERC20__factory,
  Governor,
  Governor__factory,
  MystikoDAOAccessControl,
  MystikoDAOAccessControl__factory,
  MystikoVoteToken,
  MystikoVoteToken__factory,
} from './typechain/governance';

export type SupportedContractType = ERC20 | Governor | MystikoDAOAccessControl | MystikoVoteToken;

export class MystikoGovernanceContractFactory {
  public static connect<T extends SupportedContractType>(
    contractName: string,
    address: string,
    signerOrProvider: Signer | providers.Provider,
  ): T {
    if (contractName === 'ERC20') {
      return ERC20__factory.connect(address, signerOrProvider) as T;
    }
    if (contractName === 'MystikoDAOAccessControl') {
      return MystikoDAOAccessControl__factory.connect(address, signerOrProvider) as T;
    }
    if (contractName === 'MystikoVoteToken') {
      return MystikoVoteToken__factory.connect(address, signerOrProvider) as T;
    }
    if (contractName === 'Governor') {
      return Governor__factory.connect(address, signerOrProvider) as T;
    }
    throw new Error(`unsupported contract name ${contractName}`);
  }
}

export type SupportedOpenZeppelinContractType = Governor;

export class OpenZeppelinGovernanceContractFactory {
  public static connect<T extends SupportedOpenZeppelinContractType>(
    contractName: string,
    address: string,
    signerOrProvider: Signer | providers.Provider,
  ): T {
    if (contractName === 'Governor') {
      return Governor__factory.connect(address, signerOrProvider) as T;
    }
    throw new Error(`unsupported contract name ${contractName}`);
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { GovernanceErrors, GovernanceErrorsInterface } from '../GovernanceErrors';

const _abi = [
  {
    inputs: [],
    name: 'InvalidMystikoDAOAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidMystikoRegistryAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotChanged',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyBeforeDaoInitialized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyDeployer',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyMystikoDAO',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnauthorizedRole',
    type: 'error',
  },
] as const;

const _bytecode =
  '0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122061cee37bd2949404b4f542403685ed0c79ac86ddbca4290eb93c650c1e719e0c64736f6c634300081a0033';

type GovernanceErrorsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GovernanceErrorsConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GovernanceErrors__factory extends ContractFactory {
  constructor(...args: GovernanceErrorsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: string }): Promise<GovernanceErrors> {
    return super.deploy(overrides || {}) as Promise<GovernanceErrors>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: string }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GovernanceErrors {
    return super.attach(address) as GovernanceErrors;
  }
  override connect(signer: Signer): GovernanceErrors__factory {
    return super.connect(signer) as GovernanceErrors__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GovernanceErrorsInterface {
    return new utils.Interface(_abi) as GovernanceErrorsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): GovernanceErrors {
    return new Contract(address, _abi, signerOrProvider) as GovernanceErrors;
  }
}

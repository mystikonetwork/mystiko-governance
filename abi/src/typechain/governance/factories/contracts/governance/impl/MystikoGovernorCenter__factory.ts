/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type {
  MystikoGovernorCenter,
  MystikoGovernorCenterInterface,
} from '../../../../contracts/governance/impl/MystikoGovernorCenter';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_dao',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'NotChanged',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyMystikoDAO',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'DAO',
        type: 'address',
      },
    ],
    name: 'MystikoDAOChanged',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DAO',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newMystikoDAO',
        type: 'address',
      },
    ],
    name: 'changeMystikoDAO',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMystikoDAO',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const _bytecode =
  '0x608060405234801561001057600080fd5b5060405161023138038061023183398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b61019e806100936000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806361070aa91461004657806390dff2611461006f57806398fabd3a14610084575b600080fd5b6000546001600160a01b03165b6040516001600160a01b03909116815260200160405180910390f35b61008261007d366004610138565b610097565b005b600054610053906001600160a01b031681565b6000546001600160a01b031633146100c25760405163177bc95160e11b815260040160405180910390fd5b6000546001600160a01b038083169116036100f0576040516336a1c33f60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117825560405190917fde2e1324f3df3c01ca8d6df2ffe554430c8ad84c48bef85f850875e15f81eb8691a250565b60006020828403121561014a57600080fd5b81356001600160a01b038116811461016157600080fd5b939250505056fea2646970667358221220137cef92cec579924fdd19305dac00dab60c661d4ac7d9bb9c5b94cc58e2d37e64736f6c63430008140033';

type MystikoGovernorCenterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MystikoGovernorCenterConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MystikoGovernorCenter__factory extends ContractFactory {
  constructor(...args: MystikoGovernorCenterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(_dao: string, overrides?: Overrides & { from?: string }): Promise<MystikoGovernorCenter> {
    return super.deploy(_dao, overrides || {}) as Promise<MystikoGovernorCenter>;
  }
  override getDeployTransaction(_dao: string, overrides?: Overrides & { from?: string }): TransactionRequest {
    return super.getDeployTransaction(_dao, overrides || {});
  }
  override attach(address: string): MystikoGovernorCenter {
    return super.attach(address) as MystikoGovernorCenter;
  }
  override connect(signer: Signer): MystikoGovernorCenter__factory {
    return super.connect(signer) as MystikoGovernorCenter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MystikoGovernorCenterInterface {
    return new utils.Interface(_abi) as MystikoGovernorCenterInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MystikoGovernorCenter {
    return new Contract(address, _abi, signerOrProvider) as MystikoGovernorCenter;
  }
}

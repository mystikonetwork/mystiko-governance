/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  MystikoVerifierRegistry,
  MystikoVerifierRegistryInterface,
} from '../../../../../contracts/settings/pool/impl/MystikoVerifierRegistry';

const _abi = [
  {
    inputs: [],
    name: 'InvalidRollupSize',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NumInputsGreaterThanZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyMystikoDAO',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RollupSizeNotPowerOfTwo',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'rollupSize',
        type: 'uint32',
      },
    ],
    name: 'RollupVerifierDisabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'rollupSize',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'RollupVerifierEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'inputNumber',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'outputNumber',
        type: 'uint32',
      },
    ],
    name: 'TransactVerifierDisabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'inputNumber',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'outputNumber',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'TransactVerifierEnabled',
    type: 'event',
  },
  {
    inputs: [],
    name: 'center',
    outputs: [
      {
        internalType: 'contract IMystikoGovernorCenter',
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
        internalType: 'uint32',
        name: '_rollupSize',
        type: 'uint32',
      },
    ],
    name: 'disableRollupVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_numInputs',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: '_numOutputs',
        type: 'uint32',
      },
    ],
    name: 'disableTransactVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_rollupSize',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: '_rollupVerifier',
        type: 'address',
      },
    ],
    name: 'enableRollupVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_numInputs',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: '_numOutputs',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: '_transactVerifier',
        type: 'address',
      },
    ],
    name: 'enableTransactVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_rollupSize',
        type: 'uint32',
      },
    ],
    name: 'queryRollupVerifier',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'verifier',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'enabled',
            type: 'bool',
          },
        ],
        internalType: 'struct WrappedVerifier',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_numInputs',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: '_numOutputs',
        type: 'uint32',
      },
    ],
    name: 'queryTransactVerifier',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'verifier',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'enabled',
            type: 'bool',
          },
        ],
        internalType: 'struct WrappedVerifier',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export class MystikoVerifierRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): MystikoVerifierRegistryInterface {
    return new utils.Interface(_abi) as MystikoVerifierRegistryInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MystikoVerifierRegistry {
    return new Contract(address, _abi, signerOrProvider) as MystikoVerifierRegistry;
  }
}

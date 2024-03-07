/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  IMystikoRelayerRegistry,
  IMystikoRelayerRegistryInterface,
} from '../../../../../contracts/Settings/miner/interfaces/IMystikoRelayerRegistry';

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pool',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'relayer',
            type: 'address',
          },
        ],
        internalType: 'struct CanDoRelayParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'canDoRelay',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export class IMystikoRelayerRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IMystikoRelayerRegistryInterface {
    return new utils.Interface(_abi) as IMystikoRelayerRegistryInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IMystikoRelayerRegistry {
    return new Contract(address, _abi, signerOrProvider) as IMystikoRelayerRegistry;
  }
}
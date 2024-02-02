/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  IStakingAction,
  IStakingActionInterface,
} from '../../../../../contracts/staking/interface/iStakingAction.sol/IStakingAction';

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stMstkoAmount',
        type: 'uint256',
      },
    ],
    name: 'swapMstko',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_MstkoAmount',
        type: 'uint256',
      },
    ],
    name: 'swapStMstko',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_mstkoAmount',
        type: 'uint256',
      },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stMstkoAmount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export class IStakingAction__factory {
  static readonly abi = _abi;
  static createInterface(): IStakingActionInterface {
    return new utils.Interface(_abi) as IStakingActionInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IStakingAction {
    return new Contract(address, _abi, signerOrProvider) as IStakingAction;
  }
}

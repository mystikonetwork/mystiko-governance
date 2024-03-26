/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from '../../../../common';

export interface IMystikoAuditorRegistryInterface extends utils.Interface {
  functions: {
    'queryAllAuditorPublicKeys()': FunctionFragment;
    'queryAuditorPublicKey(uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: 'queryAllAuditorPublicKeys' | 'queryAuditorPublicKey',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'queryAllAuditorPublicKeys', values?: undefined): string;
  encodeFunctionData(functionFragment: 'queryAuditorPublicKey', values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: 'queryAllAuditorPublicKeys', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryAuditorPublicKey', data: BytesLike): Result;

  events: {};
}

export interface IMystikoAuditorRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IMystikoAuditorRegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber[]>;

  queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber[]>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

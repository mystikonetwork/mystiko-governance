/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from '../../../../common';

export interface MystikoAuditorRegistryInterface extends utils.Interface {
  functions: {
    'AUDITOR_COUNT()': FunctionFragment;
    'center()': FunctionFragment;
    'queryAllAuditorPublicKeys()': FunctionFragment;
    'queryAuditorPublicKey(uint256)': FunctionFragment;
    'updateAuditorPublicKey(uint256,uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'AUDITOR_COUNT'
      | 'center'
      | 'queryAllAuditorPublicKeys'
      | 'queryAuditorPublicKey'
      | 'updateAuditorPublicKey',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'AUDITOR_COUNT', values?: undefined): string;
  encodeFunctionData(functionFragment: 'center', values?: undefined): string;
  encodeFunctionData(functionFragment: 'queryAllAuditorPublicKeys', values?: undefined): string;
  encodeFunctionData(functionFragment: 'queryAuditorPublicKey', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'updateAuditorPublicKey',
    values: [BigNumberish, BigNumberish],
  ): string;

  decodeFunctionResult(functionFragment: 'AUDITOR_COUNT', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'center', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryAllAuditorPublicKeys', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryAuditorPublicKey', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateAuditorPublicKey', data: BytesLike): Result;

  events: {
    'AuditorPublicKeyUpdated(uint256,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'AuditorPublicKeyUpdated'): EventFragment;
}

export interface AuditorPublicKeyUpdatedEventObject {
  index: BigNumber;
  publicKey: BigNumber;
}
export type AuditorPublicKeyUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  AuditorPublicKeyUpdatedEventObject
>;

export type AuditorPublicKeyUpdatedEventFilter = TypedEventFilter<AuditorPublicKeyUpdatedEvent>;

export interface MystikoAuditorRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MystikoAuditorRegistryInterface;

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
    AUDITOR_COUNT(overrides?: CallOverrides): Promise<[BigNumber]>;

    center(overrides?: CallOverrides): Promise<[string]>;

    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    updateAuditorPublicKey(
      _index: BigNumberish,
      _publicKey: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;
  };

  AUDITOR_COUNT(overrides?: CallOverrides): Promise<BigNumber>;

  center(overrides?: CallOverrides): Promise<string>;

  queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber[]>;

  queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  updateAuditorPublicKey(
    _index: BigNumberish,
    _publicKey: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  callStatic: {
    AUDITOR_COUNT(overrides?: CallOverrides): Promise<BigNumber>;

    center(overrides?: CallOverrides): Promise<string>;

    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber[]>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    updateAuditorPublicKey(
      _index: BigNumberish,
      _publicKey: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
  };

  filters: {
    'AuditorPublicKeyUpdated(uint256,uint256)'(
      index?: BigNumberish | null,
      publicKey?: null,
    ): AuditorPublicKeyUpdatedEventFilter;
    AuditorPublicKeyUpdated(
      index?: BigNumberish | null,
      publicKey?: null,
    ): AuditorPublicKeyUpdatedEventFilter;
  };

  estimateGas: {
    AUDITOR_COUNT(overrides?: CallOverrides): Promise<BigNumber>;

    center(overrides?: CallOverrides): Promise<BigNumber>;

    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    updateAuditorPublicKey(
      _index: BigNumberish,
      _publicKey: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    AUDITOR_COUNT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    center(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateAuditorPublicKey(
      _index: BigNumberish,
      _publicKey: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;
  };
}

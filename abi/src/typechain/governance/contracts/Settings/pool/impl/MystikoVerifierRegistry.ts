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

export type WrappedVerifierStruct = { verifier: string; enabled: boolean };

export type WrappedVerifierStructOutput = [string, boolean] & {
  verifier: string;
  enabled: boolean;
};

export interface MystikoVerifierRegistryInterface extends utils.Interface {
  functions: {
    'center()': FunctionFragment;
    'disableRollupVerifier(uint32)': FunctionFragment;
    'disableTransactVerifier(uint32,uint32)': FunctionFragment;
    'enableRollupVerifier(uint32,address)': FunctionFragment;
    'enableTransactVerifier(uint32,uint32,address)': FunctionFragment;
    'queryRollupVerifier(uint32)': FunctionFragment;
    'queryTransactVerifier(uint32,uint32)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'center'
      | 'disableRollupVerifier'
      | 'disableTransactVerifier'
      | 'enableRollupVerifier'
      | 'enableTransactVerifier'
      | 'queryRollupVerifier'
      | 'queryTransactVerifier',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'center', values?: undefined): string;
  encodeFunctionData(functionFragment: 'disableRollupVerifier', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'disableTransactVerifier',
    values: [BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'enableRollupVerifier', values: [BigNumberish, string]): string;
  encodeFunctionData(
    functionFragment: 'enableTransactVerifier',
    values: [BigNumberish, BigNumberish, string],
  ): string;
  encodeFunctionData(functionFragment: 'queryRollupVerifier', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'queryTransactVerifier', values: [BigNumberish, BigNumberish]): string;

  decodeFunctionResult(functionFragment: 'center', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'disableRollupVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'disableTransactVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'enableRollupVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'enableTransactVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryRollupVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryTransactVerifier', data: BytesLike): Result;

  events: {
    'RollupVerifierDisabled(uint32)': EventFragment;
    'RollupVerifierEnabled(uint32,address)': EventFragment;
    'TransactVerifierDisabled(uint32,uint32)': EventFragment;
    'TransactVerifierEnabled(uint32,uint32,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'RollupVerifierDisabled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RollupVerifierEnabled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TransactVerifierDisabled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TransactVerifierEnabled'): EventFragment;
}

export interface RollupVerifierDisabledEventObject {
  rollupSize: number;
}
export type RollupVerifierDisabledEvent = TypedEvent<[number], RollupVerifierDisabledEventObject>;

export type RollupVerifierDisabledEventFilter = TypedEventFilter<RollupVerifierDisabledEvent>;

export interface RollupVerifierEnabledEventObject {
  rollupSize: number;
  verifier: string;
}
export type RollupVerifierEnabledEvent = TypedEvent<[number, string], RollupVerifierEnabledEventObject>;

export type RollupVerifierEnabledEventFilter = TypedEventFilter<RollupVerifierEnabledEvent>;

export interface TransactVerifierDisabledEventObject {
  inputNumber: number;
  outputNumber: number;
}
export type TransactVerifierDisabledEvent = TypedEvent<[number, number], TransactVerifierDisabledEventObject>;

export type TransactVerifierDisabledEventFilter = TypedEventFilter<TransactVerifierDisabledEvent>;

export interface TransactVerifierEnabledEventObject {
  inputNumber: number;
  outputNumber: number;
  verifier: string;
}
export type TransactVerifierEnabledEvent = TypedEvent<
  [number, number, string],
  TransactVerifierEnabledEventObject
>;

export type TransactVerifierEnabledEventFilter = TypedEventFilter<TransactVerifierEnabledEvent>;

export interface MystikoVerifierRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MystikoVerifierRegistryInterface;

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
    center(overrides?: CallOverrides): Promise<[string]>;

    disableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    disableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    enableRollupVerifier(
      _rollupSize: BigNumberish,
      _rollupVerifier: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    enableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      _transactVerifier: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    queryRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[WrappedVerifierStructOutput]>;

    queryTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[WrappedVerifierStructOutput]>;
  };

  center(overrides?: CallOverrides): Promise<string>;

  disableRollupVerifier(
    _rollupSize: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  disableTransactVerifier(
    _numInputs: BigNumberish,
    _numOutputs: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  enableRollupVerifier(
    _rollupSize: BigNumberish,
    _rollupVerifier: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  enableTransactVerifier(
    _numInputs: BigNumberish,
    _numOutputs: BigNumberish,
    _transactVerifier: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  queryRollupVerifier(
    _rollupSize: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<WrappedVerifierStructOutput>;

  queryTransactVerifier(
    _numInputs: BigNumberish,
    _numOutputs: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<WrappedVerifierStructOutput>;

  callStatic: {
    center(overrides?: CallOverrides): Promise<string>;

    disableRollupVerifier(_rollupSize: BigNumberish, overrides?: CallOverrides): Promise<void>;

    disableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    enableRollupVerifier(
      _rollupSize: BigNumberish,
      _rollupVerifier: string,
      overrides?: CallOverrides,
    ): Promise<void>;

    enableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      _transactVerifier: string,
      overrides?: CallOverrides,
    ): Promise<void>;

    queryRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<WrappedVerifierStructOutput>;

    queryTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<WrappedVerifierStructOutput>;
  };

  filters: {
    'RollupVerifierDisabled(uint32)'(rollupSize?: null): RollupVerifierDisabledEventFilter;
    RollupVerifierDisabled(rollupSize?: null): RollupVerifierDisabledEventFilter;

    'RollupVerifierEnabled(uint32,address)'(
      rollupSize?: null,
      verifier?: null,
    ): RollupVerifierEnabledEventFilter;
    RollupVerifierEnabled(rollupSize?: null, verifier?: null): RollupVerifierEnabledEventFilter;

    'TransactVerifierDisabled(uint32,uint32)'(
      inputNumber?: null,
      outputNumber?: null,
    ): TransactVerifierDisabledEventFilter;
    TransactVerifierDisabled(inputNumber?: null, outputNumber?: null): TransactVerifierDisabledEventFilter;

    'TransactVerifierEnabled(uint32,uint32,address)'(
      inputNumber?: null,
      outputNumber?: null,
      verifier?: null,
    ): TransactVerifierEnabledEventFilter;
    TransactVerifierEnabled(
      inputNumber?: null,
      outputNumber?: null,
      verifier?: null,
    ): TransactVerifierEnabledEventFilter;
  };

  estimateGas: {
    center(overrides?: CallOverrides): Promise<BigNumber>;

    disableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    disableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    enableRollupVerifier(
      _rollupSize: BigNumberish,
      _rollupVerifier: string,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    enableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      _transactVerifier: string,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    queryRollupVerifier(_rollupSize: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    queryTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    center(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    disableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    disableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    enableRollupVerifier(
      _rollupSize: BigNumberish,
      _rollupVerifier: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    enableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      _transactVerifier: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    queryRollupVerifier(_rollupSize: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
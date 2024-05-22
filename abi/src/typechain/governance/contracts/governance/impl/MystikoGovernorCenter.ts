/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from '../../../common';

export interface MystikoGovernorCenterInterface extends utils.Interface {
  functions: {
    'changeMystikoDAO(address)': FunctionFragment;
    'dao()': FunctionFragment;
    'getMystikoDAO()': FunctionFragment;
    'operator()': FunctionFragment;
    'previousDaos(address)': FunctionFragment;
    'renounceOperator()': FunctionFragment;
    'rollBackMystikoDAO(address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'changeMystikoDAO'
      | 'dao'
      | 'getMystikoDAO'
      | 'operator'
      | 'previousDaos'
      | 'renounceOperator'
      | 'rollBackMystikoDAO',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'changeMystikoDAO', values: [string]): string;
  encodeFunctionData(functionFragment: 'dao', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMystikoDAO', values?: undefined): string;
  encodeFunctionData(functionFragment: 'operator', values?: undefined): string;
  encodeFunctionData(functionFragment: 'previousDaos', values: [string]): string;
  encodeFunctionData(functionFragment: 'renounceOperator', values?: undefined): string;
  encodeFunctionData(functionFragment: 'rollBackMystikoDAO', values: [string]): string;

  decodeFunctionResult(functionFragment: 'changeMystikoDAO', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'dao', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMystikoDAO', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'operator', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'previousDaos', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceOperator', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rollBackMystikoDAO', data: BytesLike): Result;

  events: {
    'MystikoDAOChanged(address)': EventFragment;
    'OperatorRenounced()': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'MystikoDAOChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OperatorRenounced'): EventFragment;
}

export interface MystikoDAOChangedEventObject {
  dao: string;
}
export type MystikoDAOChangedEvent = TypedEvent<[string], MystikoDAOChangedEventObject>;

export type MystikoDAOChangedEventFilter = TypedEventFilter<MystikoDAOChangedEvent>;

export interface OperatorRenouncedEventObject {}
export type OperatorRenouncedEvent = TypedEvent<[], OperatorRenouncedEventObject>;

export type OperatorRenouncedEventFilter = TypedEventFilter<OperatorRenouncedEvent>;

export interface MystikoGovernorCenter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MystikoGovernorCenterInterface;

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
    changeMystikoDAO(
      _newMystikoDAO: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    dao(overrides?: CallOverrides): Promise<[string]>;

    getMystikoDAO(overrides?: CallOverrides): Promise<[string]>;

    operator(overrides?: CallOverrides): Promise<[string]>;

    previousDaos(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    renounceOperator(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    rollBackMystikoDAO(
      _previousDao: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;
  };

  changeMystikoDAO(
    _newMystikoDAO: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  dao(overrides?: CallOverrides): Promise<string>;

  getMystikoDAO(overrides?: CallOverrides): Promise<string>;

  operator(overrides?: CallOverrides): Promise<string>;

  previousDaos(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  renounceOperator(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  rollBackMystikoDAO(
    _previousDao: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  callStatic: {
    changeMystikoDAO(_newMystikoDAO: string, overrides?: CallOverrides): Promise<void>;

    dao(overrides?: CallOverrides): Promise<string>;

    getMystikoDAO(overrides?: CallOverrides): Promise<string>;

    operator(overrides?: CallOverrides): Promise<string>;

    previousDaos(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    renounceOperator(overrides?: CallOverrides): Promise<void>;

    rollBackMystikoDAO(_previousDao: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'MystikoDAOChanged(address)'(dao?: string | null): MystikoDAOChangedEventFilter;
    MystikoDAOChanged(dao?: string | null): MystikoDAOChangedEventFilter;

    'OperatorRenounced()'(): OperatorRenouncedEventFilter;
    OperatorRenounced(): OperatorRenouncedEventFilter;
  };

  estimateGas: {
    changeMystikoDAO(_newMystikoDAO: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    dao(overrides?: CallOverrides): Promise<BigNumber>;

    getMystikoDAO(overrides?: CallOverrides): Promise<BigNumber>;

    operator(overrides?: CallOverrides): Promise<BigNumber>;

    previousDaos(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOperator(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    rollBackMystikoDAO(_previousDao: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;
  };

  populateTransaction: {
    changeMystikoDAO(
      _newMystikoDAO: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    dao(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMystikoDAO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    operator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    previousDaos(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOperator(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    rollBackMystikoDAO(
      _previousDao: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;
  };
}

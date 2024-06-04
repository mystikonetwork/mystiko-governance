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
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from '../../common';

export interface MystikoGovernorRegistryInterface extends utils.Interface {
  functions: {
    'dao()': FunctionFragment;
    'daoMap(address)': FunctionFragment;
    'deployer()': FunctionFragment;
    'renounceDeployer()': FunctionFragment;
    'rollBackMystikoDAO(address)': FunctionFragment;
    'setMystikoDAO(address)': FunctionFragment;
    'transferOwnerToDAO(address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'dao'
      | 'daoMap'
      | 'deployer'
      | 'renounceDeployer'
      | 'rollBackMystikoDAO'
      | 'setMystikoDAO'
      | 'transferOwnerToDAO',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'dao', values?: undefined): string;
  encodeFunctionData(functionFragment: 'daoMap', values: [string]): string;
  encodeFunctionData(functionFragment: 'deployer', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceDeployer', values?: undefined): string;
  encodeFunctionData(functionFragment: 'rollBackMystikoDAO', values: [string]): string;
  encodeFunctionData(functionFragment: 'setMystikoDAO', values: [string]): string;
  encodeFunctionData(functionFragment: 'transferOwnerToDAO', values: [string]): string;

  decodeFunctionResult(functionFragment: 'dao', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'daoMap', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'deployer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceDeployer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rollBackMystikoDAO', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMystikoDAO', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnerToDAO', data: BytesLike): Result;

  events: {
    'DeployerRenounced()': EventFragment;
    'MystikoDAOChanged(address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'DeployerRenounced'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MystikoDAOChanged'): EventFragment;
}

export interface DeployerRenouncedEventObject {}
export type DeployerRenouncedEvent = TypedEvent<[], DeployerRenouncedEventObject>;

export type DeployerRenouncedEventFilter = TypedEventFilter<DeployerRenouncedEvent>;

export interface MystikoDAOChangedEventObject {
  newDao: string;
}
export type MystikoDAOChangedEvent = TypedEvent<[string], MystikoDAOChangedEventObject>;

export type MystikoDAOChangedEventFilter = TypedEventFilter<MystikoDAOChangedEvent>;

export interface MystikoGovernorRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MystikoGovernorRegistryInterface;

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
    dao(overrides?: CallOverrides): Promise<[string]>;

    daoMap(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    deployer(overrides?: CallOverrides): Promise<[string]>;

    renounceDeployer(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    rollBackMystikoDAO(
      _previousDao: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    setMystikoDAO(_newDao: string, overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    transferOwnerToDAO(
      _newDao: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;
  };

  dao(overrides?: CallOverrides): Promise<string>;

  daoMap(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  deployer(overrides?: CallOverrides): Promise<string>;

  renounceDeployer(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  rollBackMystikoDAO(
    _previousDao: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  setMystikoDAO(_newDao: string, overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  transferOwnerToDAO(
    _newDao: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  callStatic: {
    dao(overrides?: CallOverrides): Promise<string>;

    daoMap(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    deployer(overrides?: CallOverrides): Promise<string>;

    renounceDeployer(overrides?: CallOverrides): Promise<void>;

    rollBackMystikoDAO(_previousDao: string, overrides?: CallOverrides): Promise<void>;

    setMystikoDAO(_newDao: string, overrides?: CallOverrides): Promise<void>;

    transferOwnerToDAO(_newDao: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'DeployerRenounced()'(): DeployerRenouncedEventFilter;
    DeployerRenounced(): DeployerRenouncedEventFilter;

    'MystikoDAOChanged(address)'(newDao?: string | null): MystikoDAOChangedEventFilter;
    MystikoDAOChanged(newDao?: string | null): MystikoDAOChangedEventFilter;
  };

  estimateGas: {
    dao(overrides?: CallOverrides): Promise<BigNumber>;

    daoMap(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    deployer(overrides?: CallOverrides): Promise<BigNumber>;

    renounceDeployer(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    rollBackMystikoDAO(_previousDao: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    setMystikoDAO(_newDao: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    transferOwnerToDAO(_newDao: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;
  };

  populateTransaction: {
    dao(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    daoMap(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceDeployer(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    rollBackMystikoDAO(
      _previousDao: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    setMystikoDAO(_newDao: string, overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    transferOwnerToDAO(
      _newDao: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;
  };
}
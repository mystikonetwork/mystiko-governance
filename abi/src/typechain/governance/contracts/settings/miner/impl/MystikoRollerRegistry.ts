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

export type CanDoRollupParamsStruct = {
  pool: string;
  roller: string;
  rollupSize: BigNumberish;
};

export type CanDoRollupParamsStructOutput = [string, string, BigNumber] & {
  pool: string;
  roller: string;
  rollupSize: BigNumber;
};

export interface MystikoRollerRegistryInterface extends utils.Interface {
  functions: {
    'canDoRollup((address,address,uint256))': FunctionFragment;
    'center()': FunctionFragment;
    'changeMinRollupSize(uint256)': FunctionFragment;
    'changeRollerMinVoteTokenAmount(uint256)': FunctionFragment;
    'grantRole(address)': FunctionFragment;
    'grantRoles(address[])': FunctionFragment;
    'hasRole(address)': FunctionFragment;
    'minRollupSize()': FunctionFragment;
    'minVoteTokenAmount()': FunctionFragment;
    'revokeRole(address)': FunctionFragment;
    'revokeRoles(address[])': FunctionFragment;
    'vXZK()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'canDoRollup'
      | 'center'
      | 'changeMinRollupSize'
      | 'changeRollerMinVoteTokenAmount'
      | 'grantRole'
      | 'grantRoles'
      | 'hasRole'
      | 'minRollupSize'
      | 'minVoteTokenAmount'
      | 'revokeRole'
      | 'revokeRoles'
      | 'vXZK',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'canDoRollup', values: [CanDoRollupParamsStruct]): string;
  encodeFunctionData(functionFragment: 'center', values?: undefined): string;
  encodeFunctionData(functionFragment: 'changeMinRollupSize', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'changeRollerMinVoteTokenAmount', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'grantRole', values: [string]): string;
  encodeFunctionData(functionFragment: 'grantRoles', values: [string[]]): string;
  encodeFunctionData(functionFragment: 'hasRole', values: [string]): string;
  encodeFunctionData(functionFragment: 'minRollupSize', values?: undefined): string;
  encodeFunctionData(functionFragment: 'minVoteTokenAmount', values?: undefined): string;
  encodeFunctionData(functionFragment: 'revokeRole', values: [string]): string;
  encodeFunctionData(functionFragment: 'revokeRoles', values: [string[]]): string;
  encodeFunctionData(functionFragment: 'vXZK', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'canDoRollup', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'center', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'changeMinRollupSize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'changeRollerMinVoteTokenAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'grantRole', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'grantRoles', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'hasRole', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minRollupSize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minVoteTokenAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'revokeRole', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'revokeRoles', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'vXZK', data: BytesLike): Result;

  events: {
    'MinRollupSizeChanged(uint256)': EventFragment;
    'RoleGranted(address)': EventFragment;
    'RoleRevoked(address)': EventFragment;
    'RollerMinVoteTokenAmountChanged(uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'MinRollupSizeChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RoleGranted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RoleRevoked'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RollerMinVoteTokenAmountChanged'): EventFragment;
}

export interface MinRollupSizeChangedEventObject {
  _size: BigNumber;
}
export type MinRollupSizeChangedEvent = TypedEvent<[BigNumber], MinRollupSizeChangedEventObject>;

export type MinRollupSizeChangedEventFilter = TypedEventFilter<MinRollupSizeChangedEvent>;

export interface RoleGrantedEventObject {
  account: string;
}
export type RoleGrantedEvent = TypedEvent<[string], RoleGrantedEventObject>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  account: string;
}
export type RoleRevokedEvent = TypedEvent<[string], RoleRevokedEventObject>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface RollerMinVoteTokenAmountChangedEventObject {
  _amount: BigNumber;
}
export type RollerMinVoteTokenAmountChangedEvent = TypedEvent<
  [BigNumber],
  RollerMinVoteTokenAmountChangedEventObject
>;

export type RollerMinVoteTokenAmountChangedEventFilter =
  TypedEventFilter<RollerMinVoteTokenAmountChangedEvent>;

export interface MystikoRollerRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MystikoRollerRegistryInterface;

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
    canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<[boolean]>;

    center(overrides?: CallOverrides): Promise<[string]>;

    changeMinRollupSize(
      _newMinRollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    changeRollerMinVoteTokenAmount(
      _newMinVoteTokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    grantRole(_account: string, overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    grantRoles(_accounts: string[], overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    hasRole(_account: string, overrides?: CallOverrides): Promise<[boolean]>;

    minRollupSize(overrides?: CallOverrides): Promise<[BigNumber]>;

    minVoteTokenAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    revokeRole(_account: string, overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    revokeRoles(_accounts: string[], overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    vXZK(overrides?: CallOverrides): Promise<[string]>;
  };

  canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<boolean>;

  center(overrides?: CallOverrides): Promise<string>;

  changeMinRollupSize(
    _newMinRollupSize: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  changeRollerMinVoteTokenAmount(
    _newMinVoteTokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  grantRole(_account: string, overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  grantRoles(_accounts: string[], overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  hasRole(_account: string, overrides?: CallOverrides): Promise<boolean>;

  minRollupSize(overrides?: CallOverrides): Promise<BigNumber>;

  minVoteTokenAmount(overrides?: CallOverrides): Promise<BigNumber>;

  revokeRole(_account: string, overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  revokeRoles(_accounts: string[], overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  vXZK(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<boolean>;

    center(overrides?: CallOverrides): Promise<string>;

    changeMinRollupSize(_newMinRollupSize: BigNumberish, overrides?: CallOverrides): Promise<void>;

    changeRollerMinVoteTokenAmount(
      _newMinVoteTokenAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    grantRole(_account: string, overrides?: CallOverrides): Promise<void>;

    grantRoles(_accounts: string[], overrides?: CallOverrides): Promise<void>;

    hasRole(_account: string, overrides?: CallOverrides): Promise<boolean>;

    minRollupSize(overrides?: CallOverrides): Promise<BigNumber>;

    minVoteTokenAmount(overrides?: CallOverrides): Promise<BigNumber>;

    revokeRole(_account: string, overrides?: CallOverrides): Promise<void>;

    revokeRoles(_accounts: string[], overrides?: CallOverrides): Promise<void>;

    vXZK(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    'MinRollupSizeChanged(uint256)'(_size?: null): MinRollupSizeChangedEventFilter;
    MinRollupSizeChanged(_size?: null): MinRollupSizeChangedEventFilter;

    'RoleGranted(address)'(account?: string | null): RoleGrantedEventFilter;
    RoleGranted(account?: string | null): RoleGrantedEventFilter;

    'RoleRevoked(address)'(account?: string | null): RoleRevokedEventFilter;
    RoleRevoked(account?: string | null): RoleRevokedEventFilter;

    'RollerMinVoteTokenAmountChanged(uint256)'(_amount?: null): RollerMinVoteTokenAmountChangedEventFilter;
    RollerMinVoteTokenAmountChanged(_amount?: null): RollerMinVoteTokenAmountChangedEventFilter;
  };

  estimateGas: {
    canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;

    center(overrides?: CallOverrides): Promise<BigNumber>;

    changeMinRollupSize(
      _newMinRollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    changeRollerMinVoteTokenAmount(
      _newMinVoteTokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    grantRole(_account: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    grantRoles(_accounts: string[], overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    hasRole(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    minRollupSize(overrides?: CallOverrides): Promise<BigNumber>;

    minVoteTokenAmount(overrides?: CallOverrides): Promise<BigNumber>;

    revokeRole(_account: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    revokeRoles(_accounts: string[], overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    vXZK(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    center(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    changeMinRollupSize(
      _newMinRollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    changeRollerMinVoteTokenAmount(
      _newMinVoteTokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    grantRole(_account: string, overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    grantRoles(_accounts: string[], overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    hasRole(_account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minRollupSize(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minVoteTokenAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    revokeRole(_account: string, overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    revokeRoles(
      _accounts: string[],
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    vXZK(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
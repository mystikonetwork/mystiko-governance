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
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from '../../common';

export type CanDoRelayParamsStruct = { pool: string; relayer: string };

export type CanDoRelayParamsStructOutput = [string, string] & {
  pool: string;
  relayer: string;
};

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

export type WrappedVerifierStruct = { verifier: string; enabled: boolean };

export type WrappedVerifierStructOutput = [string, boolean] & {
  verifier: string;
  enabled: boolean;
};

export type CertificateParamsStruct = {
  account: string;
  asset: string;
  deadline: BigNumberish;
  signature: BytesLike;
};

export type CertificateParamsStructOutput = [string, string, BigNumber, string] & {
  account: string;
  asset: string;
  deadline: BigNumber;
  signature: string;
};

export interface MystikoSettingsCenterInterface extends utils.Interface {
  functions: {
    'AUDITOR_COUNT()': FunctionFragment;
    'canDoRelay((address,address))': FunctionFragment;
    'canDoRollup((address,address,uint256))': FunctionFragment;
    'center()': FunctionFragment;
    'certificateRegistry()': FunctionFragment;
    'changeCertificateRegistry(address)': FunctionFragment;
    'changeRelayerRegistry(address)': FunctionFragment;
    'changeRollerRegistry(address)': FunctionFragment;
    'disableRollupVerifier(uint32)': FunctionFragment;
    'disableSanctionsCheck()': FunctionFragment;
    'disableTransactVerifier(uint32,uint32)': FunctionFragment;
    'enableRollupVerifier(uint32)': FunctionFragment;
    'enableSanctionsCheck()': FunctionFragment;
    'enableTransactVerifier(uint32,uint32)': FunctionFragment;
    'getIssuerAddress()': FunctionFragment;
    'isSanctioned(address)': FunctionFragment;
    'queryAllAuditorPublicKeys()': FunctionFragment;
    'queryAuditorPublicKey(uint256)': FunctionFragment;
    'queryRollupVerifier(uint32)': FunctionFragment;
    'queryTransactVerifier(uint32,uint32)': FunctionFragment;
    'relayerRegistry()': FunctionFragment;
    'rollerRegistry()': FunctionFragment;
    'sanctionsCheck()': FunctionFragment;
    'sanctionsList()': FunctionFragment;
    'updateAuditorPublicKey(uint256,uint256)': FunctionFragment;
    'updateSanctionsListAddress(address)': FunctionFragment;
    'verifyCertificate((address,address,uint256,bytes))': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'AUDITOR_COUNT'
      | 'canDoRelay'
      | 'canDoRollup'
      | 'center'
      | 'certificateRegistry'
      | 'changeCertificateRegistry'
      | 'changeRelayerRegistry'
      | 'changeRollerRegistry'
      | 'disableRollupVerifier'
      | 'disableSanctionsCheck'
      | 'disableTransactVerifier'
      | 'enableRollupVerifier'
      | 'enableSanctionsCheck'
      | 'enableTransactVerifier'
      | 'getIssuerAddress'
      | 'isSanctioned'
      | 'queryAllAuditorPublicKeys'
      | 'queryAuditorPublicKey'
      | 'queryRollupVerifier'
      | 'queryTransactVerifier'
      | 'relayerRegistry'
      | 'rollerRegistry'
      | 'sanctionsCheck'
      | 'sanctionsList'
      | 'updateAuditorPublicKey'
      | 'updateSanctionsListAddress'
      | 'verifyCertificate',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'AUDITOR_COUNT', values?: undefined): string;
  encodeFunctionData(functionFragment: 'canDoRelay', values: [CanDoRelayParamsStruct]): string;
  encodeFunctionData(functionFragment: 'canDoRollup', values: [CanDoRollupParamsStruct]): string;
  encodeFunctionData(functionFragment: 'center', values?: undefined): string;
  encodeFunctionData(functionFragment: 'certificateRegistry', values?: undefined): string;
  encodeFunctionData(functionFragment: 'changeCertificateRegistry', values: [string]): string;
  encodeFunctionData(functionFragment: 'changeRelayerRegistry', values: [string]): string;
  encodeFunctionData(functionFragment: 'changeRollerRegistry', values: [string]): string;
  encodeFunctionData(functionFragment: 'disableRollupVerifier', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'disableSanctionsCheck', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'disableTransactVerifier',
    values: [BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'enableRollupVerifier', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'enableSanctionsCheck', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'enableTransactVerifier',
    values: [BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'getIssuerAddress', values?: undefined): string;
  encodeFunctionData(functionFragment: 'isSanctioned', values: [string]): string;
  encodeFunctionData(functionFragment: 'queryAllAuditorPublicKeys', values?: undefined): string;
  encodeFunctionData(functionFragment: 'queryAuditorPublicKey', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'queryRollupVerifier', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'queryTransactVerifier', values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'relayerRegistry', values?: undefined): string;
  encodeFunctionData(functionFragment: 'rollerRegistry', values?: undefined): string;
  encodeFunctionData(functionFragment: 'sanctionsCheck', values?: undefined): string;
  encodeFunctionData(functionFragment: 'sanctionsList', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'updateAuditorPublicKey',
    values: [BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'updateSanctionsListAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'verifyCertificate', values: [CertificateParamsStruct]): string;

  decodeFunctionResult(functionFragment: 'AUDITOR_COUNT', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'canDoRelay', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'canDoRollup', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'center', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'certificateRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'changeCertificateRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'changeRelayerRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'changeRollerRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'disableRollupVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'disableSanctionsCheck', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'disableTransactVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'enableRollupVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'enableSanctionsCheck', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'enableTransactVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getIssuerAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isSanctioned', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryAllAuditorPublicKeys', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryAuditorPublicKey', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryRollupVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'queryTransactVerifier', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'relayerRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rollerRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sanctionsCheck', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sanctionsList', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateAuditorPublicKey', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateSanctionsListAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'verifyCertificate', data: BytesLike): Result;

  events: {
    'AuditorPublicKeyUpdated(uint256,uint256)': EventFragment;
    'CertificateRegistryChanged(address)': EventFragment;
    'RelayerRegistryChanged(address)': EventFragment;
    'RollerRegistryChanged(address)': EventFragment;
    'RollupVerifierDisabled(uint32)': EventFragment;
    'RollupVerifierEnabled(uint32)': EventFragment;
    'SanctionsCheck(bool)': EventFragment;
    'SanctionsListChanged(address)': EventFragment;
    'TransactVerifierDisabled(uint32,uint32)': EventFragment;
    'TransactVerifierEnabled(uint32,uint32)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'AuditorPublicKeyUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CertificateRegistryChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RelayerRegistryChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RollerRegistryChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RollupVerifierDisabled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RollupVerifierEnabled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SanctionsCheck'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SanctionsListChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TransactVerifierDisabled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TransactVerifierEnabled'): EventFragment;
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

export interface CertificateRegistryChangedEventObject {
  registry: string;
}
export type CertificateRegistryChangedEvent = TypedEvent<[string], CertificateRegistryChangedEventObject>;

export type CertificateRegistryChangedEventFilter = TypedEventFilter<CertificateRegistryChangedEvent>;

export interface RelayerRegistryChangedEventObject {
  registry: string;
}
export type RelayerRegistryChangedEvent = TypedEvent<[string], RelayerRegistryChangedEventObject>;

export type RelayerRegistryChangedEventFilter = TypedEventFilter<RelayerRegistryChangedEvent>;

export interface RollerRegistryChangedEventObject {
  registry: string;
}
export type RollerRegistryChangedEvent = TypedEvent<[string], RollerRegistryChangedEventObject>;

export type RollerRegistryChangedEventFilter = TypedEventFilter<RollerRegistryChangedEvent>;

export interface RollupVerifierDisabledEventObject {
  rollupSize: number;
}
export type RollupVerifierDisabledEvent = TypedEvent<[number], RollupVerifierDisabledEventObject>;

export type RollupVerifierDisabledEventFilter = TypedEventFilter<RollupVerifierDisabledEvent>;

export interface RollupVerifierEnabledEventObject {
  rollupSize: number;
}
export type RollupVerifierEnabledEvent = TypedEvent<[number], RollupVerifierEnabledEventObject>;

export type RollupVerifierEnabledEventFilter = TypedEventFilter<RollupVerifierEnabledEvent>;

export interface SanctionsCheckEventObject {
  state: boolean;
}
export type SanctionsCheckEvent = TypedEvent<[boolean], SanctionsCheckEventObject>;

export type SanctionsCheckEventFilter = TypedEventFilter<SanctionsCheckEvent>;

export interface SanctionsListChangedEventObject {
  list: string;
}
export type SanctionsListChangedEvent = TypedEvent<[string], SanctionsListChangedEventObject>;

export type SanctionsListChangedEventFilter = TypedEventFilter<SanctionsListChangedEvent>;

export interface TransactVerifierDisabledEventObject {
  inputNumber: number;
  outputNumber: number;
}
export type TransactVerifierDisabledEvent = TypedEvent<[number, number], TransactVerifierDisabledEventObject>;

export type TransactVerifierDisabledEventFilter = TypedEventFilter<TransactVerifierDisabledEvent>;

export interface TransactVerifierEnabledEventObject {
  inputNumber: number;
  outputNumber: number;
}
export type TransactVerifierEnabledEvent = TypedEvent<[number, number], TransactVerifierEnabledEventObject>;

export type TransactVerifierEnabledEventFilter = TypedEventFilter<TransactVerifierEnabledEvent>;

export interface MystikoSettingsCenter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MystikoSettingsCenterInterface;

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

    canDoRelay(_params: CanDoRelayParamsStruct, overrides?: CallOverrides): Promise<[boolean]>;

    canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<[boolean]>;

    center(overrides?: CallOverrides): Promise<[string]>;

    certificateRegistry(overrides?: CallOverrides): Promise<[string]>;

    changeCertificateRegistry(
      _newCertificateRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    changeRelayerRegistry(
      _newRelayerRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    changeRollerRegistry(
      _newRollerRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    disableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    disableSanctionsCheck(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    disableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    enableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    enableSanctionsCheck(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    enableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    getIssuerAddress(overrides?: CallOverrides): Promise<[string]>;

    isSanctioned(_account: string, overrides?: CallOverrides): Promise<[boolean]>;

    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    queryRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[WrappedVerifierStructOutput]>;

    queryTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[WrappedVerifierStructOutput]>;

    relayerRegistry(overrides?: CallOverrides): Promise<[string]>;

    rollerRegistry(overrides?: CallOverrides): Promise<[string]>;

    sanctionsCheck(overrides?: CallOverrides): Promise<[boolean]>;

    sanctionsList(overrides?: CallOverrides): Promise<[string]>;

    updateAuditorPublicKey(
      _index: BigNumberish,
      _publicKey: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    updateSanctionsListAddress(
      _sanction: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    verifyCertificate(_params: CertificateParamsStruct, overrides?: CallOverrides): Promise<[boolean]>;
  };

  AUDITOR_COUNT(overrides?: CallOverrides): Promise<BigNumber>;

  canDoRelay(_params: CanDoRelayParamsStruct, overrides?: CallOverrides): Promise<boolean>;

  canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<boolean>;

  center(overrides?: CallOverrides): Promise<string>;

  certificateRegistry(overrides?: CallOverrides): Promise<string>;

  changeCertificateRegistry(
    _newCertificateRegistry: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  changeRelayerRegistry(
    _newRelayerRegistry: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  changeRollerRegistry(
    _newRollerRegistry: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  disableRollupVerifier(
    _rollupSize: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  disableSanctionsCheck(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  disableTransactVerifier(
    _numInputs: BigNumberish,
    _numOutputs: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  enableRollupVerifier(
    _rollupSize: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  enableSanctionsCheck(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  enableTransactVerifier(
    _numInputs: BigNumberish,
    _numOutputs: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  getIssuerAddress(overrides?: CallOverrides): Promise<string>;

  isSanctioned(_account: string, overrides?: CallOverrides): Promise<boolean>;

  queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber[]>;

  queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  queryRollupVerifier(
    _rollupSize: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<WrappedVerifierStructOutput>;

  queryTransactVerifier(
    _numInputs: BigNumberish,
    _numOutputs: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<WrappedVerifierStructOutput>;

  relayerRegistry(overrides?: CallOverrides): Promise<string>;

  rollerRegistry(overrides?: CallOverrides): Promise<string>;

  sanctionsCheck(overrides?: CallOverrides): Promise<boolean>;

  sanctionsList(overrides?: CallOverrides): Promise<string>;

  updateAuditorPublicKey(
    _index: BigNumberish,
    _publicKey: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  updateSanctionsListAddress(
    _sanction: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  verifyCertificate(_params: CertificateParamsStruct, overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    AUDITOR_COUNT(overrides?: CallOverrides): Promise<BigNumber>;

    canDoRelay(_params: CanDoRelayParamsStruct, overrides?: CallOverrides): Promise<boolean>;

    canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<boolean>;

    center(overrides?: CallOverrides): Promise<string>;

    certificateRegistry(overrides?: CallOverrides): Promise<string>;

    changeCertificateRegistry(_newCertificateRegistry: string, overrides?: CallOverrides): Promise<void>;

    changeRelayerRegistry(_newRelayerRegistry: string, overrides?: CallOverrides): Promise<void>;

    changeRollerRegistry(_newRollerRegistry: string, overrides?: CallOverrides): Promise<void>;

    disableRollupVerifier(_rollupSize: BigNumberish, overrides?: CallOverrides): Promise<void>;

    disableSanctionsCheck(overrides?: CallOverrides): Promise<void>;

    disableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    enableRollupVerifier(_rollupSize: BigNumberish, overrides?: CallOverrides): Promise<void>;

    enableSanctionsCheck(overrides?: CallOverrides): Promise<void>;

    enableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    getIssuerAddress(overrides?: CallOverrides): Promise<string>;

    isSanctioned(_account: string, overrides?: CallOverrides): Promise<boolean>;

    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber[]>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    queryRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<WrappedVerifierStructOutput>;

    queryTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<WrappedVerifierStructOutput>;

    relayerRegistry(overrides?: CallOverrides): Promise<string>;

    rollerRegistry(overrides?: CallOverrides): Promise<string>;

    sanctionsCheck(overrides?: CallOverrides): Promise<boolean>;

    sanctionsList(overrides?: CallOverrides): Promise<string>;

    updateAuditorPublicKey(
      _index: BigNumberish,
      _publicKey: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    updateSanctionsListAddress(_sanction: string, overrides?: CallOverrides): Promise<void>;

    verifyCertificate(_params: CertificateParamsStruct, overrides?: CallOverrides): Promise<boolean>;
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

    'CertificateRegistryChanged(address)'(registry?: string | null): CertificateRegistryChangedEventFilter;
    CertificateRegistryChanged(registry?: string | null): CertificateRegistryChangedEventFilter;

    'RelayerRegistryChanged(address)'(registry?: string | null): RelayerRegistryChangedEventFilter;
    RelayerRegistryChanged(registry?: string | null): RelayerRegistryChangedEventFilter;

    'RollerRegistryChanged(address)'(registry?: string | null): RollerRegistryChangedEventFilter;
    RollerRegistryChanged(registry?: string | null): RollerRegistryChangedEventFilter;

    'RollupVerifierDisabled(uint32)'(rollupSize?: null): RollupVerifierDisabledEventFilter;
    RollupVerifierDisabled(rollupSize?: null): RollupVerifierDisabledEventFilter;

    'RollupVerifierEnabled(uint32)'(rollupSize?: null): RollupVerifierEnabledEventFilter;
    RollupVerifierEnabled(rollupSize?: null): RollupVerifierEnabledEventFilter;

    'SanctionsCheck(bool)'(state?: null): SanctionsCheckEventFilter;
    SanctionsCheck(state?: null): SanctionsCheckEventFilter;

    'SanctionsListChanged(address)'(list?: null): SanctionsListChangedEventFilter;
    SanctionsListChanged(list?: null): SanctionsListChangedEventFilter;

    'TransactVerifierDisabled(uint32,uint32)'(
      inputNumber?: null,
      outputNumber?: null,
    ): TransactVerifierDisabledEventFilter;
    TransactVerifierDisabled(inputNumber?: null, outputNumber?: null): TransactVerifierDisabledEventFilter;

    'TransactVerifierEnabled(uint32,uint32)'(
      inputNumber?: null,
      outputNumber?: null,
    ): TransactVerifierEnabledEventFilter;
    TransactVerifierEnabled(inputNumber?: null, outputNumber?: null): TransactVerifierEnabledEventFilter;
  };

  estimateGas: {
    AUDITOR_COUNT(overrides?: CallOverrides): Promise<BigNumber>;

    canDoRelay(_params: CanDoRelayParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;

    canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;

    center(overrides?: CallOverrides): Promise<BigNumber>;

    certificateRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    changeCertificateRegistry(
      _newCertificateRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    changeRelayerRegistry(
      _newRelayerRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    changeRollerRegistry(
      _newRollerRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    disableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    disableSanctionsCheck(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    disableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    enableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    enableSanctionsCheck(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    enableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    getIssuerAddress(overrides?: CallOverrides): Promise<BigNumber>;

    isSanctioned(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<BigNumber>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    queryRollupVerifier(_rollupSize: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    queryTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    relayerRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    rollerRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    sanctionsCheck(overrides?: CallOverrides): Promise<BigNumber>;

    sanctionsList(overrides?: CallOverrides): Promise<BigNumber>;

    updateAuditorPublicKey(
      _index: BigNumberish,
      _publicKey: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    updateSanctionsListAddress(
      _sanction: string,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    verifyCertificate(_params: CertificateParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    AUDITOR_COUNT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    canDoRelay(_params: CanDoRelayParamsStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    canDoRollup(_params: CanDoRollupParamsStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    center(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    certificateRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    changeCertificateRegistry(
      _newCertificateRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    changeRelayerRegistry(
      _newRelayerRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    changeRollerRegistry(
      _newRollerRegistry: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    disableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    disableSanctionsCheck(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    disableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    enableRollupVerifier(
      _rollupSize: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    enableSanctionsCheck(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    enableTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    getIssuerAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isSanctioned(_account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryAllAuditorPublicKeys(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryAuditorPublicKey(_index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryRollupVerifier(_rollupSize: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryTransactVerifier(
      _numInputs: BigNumberish,
      _numOutputs: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    relayerRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rollerRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sanctionsCheck(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sanctionsList(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateAuditorPublicKey(
      _index: BigNumberish,
      _publicKey: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    updateSanctionsListAddress(
      _sanction: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    verifyCertificate(
      _params: CertificateParamsStruct,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}

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
  };

  getFunction(nameOrSignatureOrTopic: 'changeMystikoDAO' | 'dao' | 'getMystikoDAO'): FunctionFragment;

  encodeFunctionData(functionFragment: 'changeMystikoDAO', values: [string]): string;
  encodeFunctionData(functionFragment: 'dao', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMystikoDAO', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'changeMystikoDAO', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'dao', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMystikoDAO', data: BytesLike): Result;

  events: {
    'MystikoDAOChanged(address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'MystikoDAOChanged'): EventFragment;
}

export interface MystikoDAOChangedEventObject {
  dao: string;
}
export type MystikoDAOChangedEvent = TypedEvent<[string], MystikoDAOChangedEventObject>;

export type MystikoDAOChangedEventFilter = TypedEventFilter<MystikoDAOChangedEvent>;

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
  };

  changeMystikoDAO(
    _newMystikoDAO: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  dao(overrides?: CallOverrides): Promise<string>;

  getMystikoDAO(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    changeMystikoDAO(_newMystikoDAO: string, overrides?: CallOverrides): Promise<void>;

    dao(overrides?: CallOverrides): Promise<string>;

    getMystikoDAO(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    'MystikoDAOChanged(address)'(dao?: string | null): MystikoDAOChangedEventFilter;
    MystikoDAOChanged(dao?: string | null): MystikoDAOChangedEventFilter;
  };

  estimateGas: {
    changeMystikoDAO(_newMystikoDAO: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    dao(overrides?: CallOverrides): Promise<BigNumber>;

    getMystikoDAO(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    changeMystikoDAO(
      _newMystikoDAO: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    dao(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMystikoDAO(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

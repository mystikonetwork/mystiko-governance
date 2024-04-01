/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, BigNumberish, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type {
  MystikoRelayerRegistry,
  MystikoRelayerRegistryInterface,
} from '../../../../../contracts/Settings/miner/impl/MystikoRelayerRegistry';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_daoCenter',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_vXZK',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_minVoteTokenAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'InsufficientBalanceForAction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotChanged',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyMystikoDAO',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnauthorizedRole',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'RelayerMinVoteTokenAmountChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
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
  {
    inputs: [],
    name: 'center',
    outputs: [
      {
        internalType: 'contract IMystikoGovernorCenter',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newMinVoteTokenAmount',
        type: 'uint256',
      },
    ],
    name: 'changeRelayerMinVoteTokenAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_accounts',
        type: 'address[]',
      },
    ],
    name: 'grantRoles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'hasRole',
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
  {
    inputs: [],
    name: 'minVoteTokenAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_accounts',
        type: 'address[]',
      },
    ],
    name: 'revokeRoles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vXZK',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const _bytecode =
  '0x608060405234801561001057600080fd5b50604051610aaf380380610aaf83398101604081905261002f91610082565b600080546001600160a01b039485166001600160a01b031991821617909155600291909155600380549290931691161790556100be565b80516001600160a01b038116811461007d57600080fd5b919050565b60008060006060848603121561009757600080fd5b6100a084610066565b92506100ae60208501610066565b9150604084015190509250925092565b6109e2806100cd6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638dc9a3c3116100665780638dc9a3c31461014e578063bf420c5614610161578063c6fc3a8114610174578063e254001c14610187578063e5ef84051461019a57600080fd5b80631f02d715146100a357806338977686146100d357806374feb059146100e85780637ef09bca146100ff57806380e52e3f1461013b575b600080fd5b6000546100b6906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100e66100e136600461086f565b6101ad565b005b6100f160025481565b6040519081526020016100ca565b61012b61010d36600461086f565b6001600160a01b031660009081526001602052604090205460ff1690565b60405190151581526020016100ca565b6100e661014936600461086f565b610290565b6100e661015c366004610893565b61036d565b61012b61016f366004610908565b6104d3565b6100e6610182366004610920565b610604565b6003546100b6906001600160a01b031681565b6100e66101a8366004610893565b6106f5565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa1580156101f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021a9190610939565b6001600160a01b0316146102415760405163177bc95160e11b815260040160405180910390fd5b6001600160a01b0381166000818152600160208190526040808320805460ff1916909217909155517f0baaa7abe79fc29984705b05242ef0b47970e216d9df1d047efebd0d490630699190a250565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa1580156102d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102fd9190610939565b6001600160a01b0316146103245760405163177bc95160e11b815260040160405180910390fd5b6001600160a01b038116600081815260016020526040808220805460ff19169055517f6107a4a5447a4208ba14e3ec240bccf0a93828124ccf501af04601031070b1839190a250565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa1580156103b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103da9190610939565b6001600160a01b0316146104015760405163177bc95160e11b815260040160405180910390fd5b60005b818110156104ce57600180600085858581811061042357610423610956565b9050602002016020810190610438919061086f565b6001600160a01b031681526020810191909152604001600020805460ff191691151591909117905582828281811061047257610472610956565b9050602002016020810190610487919061086f565b6001600160a01b03167f0baaa7abe79fc29984705b05242ef0b47970e216d9df1d047efebd0d4906306960405160405180910390a2806104c68161096c565b915050610404565b505050565b60006104e5604083016020840161086f565b6000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb495460ff16610550576001600160a01b03811660009081526001602052604090205460ff1661055057604051630aedfc3560e21b815260040160405180910390fd5b6002546003546001600160a01b03166370a08231610574604087016020880161086f565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa1580156105b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105dc9190610993565b10156105fb5760405163f241cafb60e01b815260040160405180910390fd5b50600192915050565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa15801561064d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106719190610939565b6001600160a01b0316146106985760405163177bc95160e11b815260040160405180910390fd5b80600254036106ba576040516336a1c33f60e01b815260040160405180910390fd5b60028190556040518181527f12264c570871a99b923f1d752e51ad4ec4cf334cb88cac55a0bc4738a88ae6f29060200160405180910390a150565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa15801561073e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107629190610939565b6001600160a01b0316146107895760405163177bc95160e11b815260040160405180910390fd5b60005b818110156104ce576000600160008585858181106107ac576107ac610956565b90506020020160208101906107c1919061086f565b6001600160a01b031681526020810191909152604001600020805460ff19169115159190911790558282828181106107fb576107fb610956565b9050602002016020810190610810919061086f565b6001600160a01b03167f6107a4a5447a4208ba14e3ec240bccf0a93828124ccf501af04601031070b18360405160405180910390a28061084f8161096c565b91505061078c565b6001600160a01b038116811461086c57600080fd5b50565b60006020828403121561088157600080fd5b813561088c81610857565b9392505050565b600080602083850312156108a657600080fd5b823567ffffffffffffffff808211156108be57600080fd5b818501915085601f8301126108d257600080fd5b8135818111156108e157600080fd5b8660208260051b85010111156108f657600080fd5b60209290920196919550909350505050565b60006040828403121561091a57600080fd5b50919050565b60006020828403121561093257600080fd5b5035919050565b60006020828403121561094b57600080fd5b815161088c81610857565b634e487b7160e01b600052603260045260246000fd5b60006001820161098c57634e487b7160e01b600052601160045260246000fd5b5060010190565b6000602082840312156109a557600080fd5b505191905056fea264697066735822122027f49ca59a0c8d6f06fcd4b532f45ce245f058926ce98ce2d19fcfbfc4d75c3764736f6c63430008140033';

type MystikoRelayerRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MystikoRelayerRegistryConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MystikoRelayerRegistry__factory extends ContractFactory {
  constructor(...args: MystikoRelayerRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _daoCenter: string,
    _vXZK: string,
    _minVoteTokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<MystikoRelayerRegistry> {
    return super.deploy(
      _daoCenter,
      _vXZK,
      _minVoteTokenAmount,
      overrides || {},
    ) as Promise<MystikoRelayerRegistry>;
  }
  override getDeployTransaction(
    _daoCenter: string,
    _vXZK: string,
    _minVoteTokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): TransactionRequest {
    return super.getDeployTransaction(_daoCenter, _vXZK, _minVoteTokenAmount, overrides || {});
  }
  override attach(address: string): MystikoRelayerRegistry {
    return super.attach(address) as MystikoRelayerRegistry;
  }
  override connect(signer: Signer): MystikoRelayerRegistry__factory {
    return super.connect(signer) as MystikoRelayerRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MystikoRelayerRegistryInterface {
    return new utils.Interface(_abi) as MystikoRelayerRegistryInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MystikoRelayerRegistry {
    return new Contract(address, _abi, signerOrProvider) as MystikoRelayerRegistry;
  }
}

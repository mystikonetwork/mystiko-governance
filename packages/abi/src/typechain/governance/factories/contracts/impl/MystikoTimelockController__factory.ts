/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, BigNumberish, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type {
  MystikoTimelockController,
  MystikoTimelockControllerInterface,
} from '../../../contracts/impl/MystikoTimelockController';

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_minDelay',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32',
      },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailedInnerCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'delay',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minDelay',
        type: 'uint256',
      },
    ],
    name: 'TimelockInsufficientDelay',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'targets',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'payloads',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'values',
        type: 'uint256',
      },
    ],
    name: 'TimelockInvalidOperationLength',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'TimelockUnauthorizedCaller',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'predecessorId',
        type: 'bytes32',
      },
    ],
    name: 'TimelockUnexecutedPredecessor',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'operationId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'expectedStates',
        type: 'bytes32',
      },
    ],
    name: 'TimelockUnexpectedOperationState',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'CallExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'CallSalt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'predecessor',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'delay',
        type: 'uint256',
      },
    ],
    name: 'CallScheduled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'Cancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDuration',
        type: 'uint256',
      },
    ],
    name: 'MinDelayChange',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    inputs: [],
    name: 'CANCELLER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'EXECUTOR_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PROPOSER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'predecessor',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'payloads',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'predecessor',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'executeBatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMinDelay',
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
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'getOperationState',
    outputs: [
      {
        internalType: 'enum TimelockController.OperationState',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'getTimestamp',
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
        name: '_governor',
        type: 'address',
      },
    ],
    name: 'grantGovernorRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
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
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'predecessor',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'hashOperation',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'payloads',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'predecessor',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'hashOperationBatch',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'isOperation',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'isOperationDone',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'isOperationPending',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'isOperationReady',
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
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
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
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'predecessor',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'delay',
        type: 'uint256',
      },
    ],
    name: 'schedule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'payloads',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'predecessor',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'delay',
        type: 'uint256',
      },
    ],
    name: 'scheduleBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'newDelay',
        type: 'uint256',
      },
    ],
    name: 'updateDelay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const;

const _bytecode =
  '0x608060405234801561001057600080fd5b50604051611eb1380380611eb183398101604081905261002f91610248565b604080516000808252602082018181528284019093528392903390610054903061019c565b506001600160a01b038116156100715761006f60008261019c565b505b60005b8351811015610106576100c67fb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc18583815181106100b3576100b3610261565b602002602001015161019c60201b60201c565b506100fd7ffd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f7838583815181106100b3576100b3610261565b50600101610074565b5060005b8251811015610152576101497fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e638483815181106100b3576100b3610261565b5060010161010a565b5060028490556040805160008152602081018690527f11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5910160405180910390a15050505050610277565b6000828152602081815260408083206001600160a01b038516845290915281205460ff1661023e576000838152602081815260408083206001600160a01b03861684529091529020805460ff191660011790556101f63390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4506001610242565b5060005b92915050565b60006020828403121561025a57600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b611c2b806102866000396000f3fe6080604052600436106101c65760003560e01c80638065657f116100f7578063bc197c8111610095578063e38335e511610064578063e38335e5146105b9578063e4dd1dca146105cc578063f23a6e61146105ec578063f27a0c921461061857600080fd5b8063bc197c8114610520578063c4d252f51461054c578063d45c44351461056c578063d547741f1461059957600080fd5b806391d14854116100d157806391d1485414610473578063a217fddf146104b7578063b08e51c0146104cc578063b1c5f4271461050057600080fd5b80638065657f146103ff5780638f2a0bb01461041f5780638f61f4f51461043f57600080fd5b80632ab0f5291161016457806336568abe1161013e57806336568abe14610372578063584b153e1461039257806364d62353146103b25780637958004c146103d257600080fd5b80632ab0f529146103125780632f2ff15d1461033257806331d507501461035257600080fd5b8063134008d3116101a0578063134008d31461026b57806313bc9f201461027e578063150b7a021461029e578063248a9ca3146102e257600080fd5b806301d5062a146101d257806301ffc9a7146101f457806307bd02651461022957600080fd5b366101cd57005b600080fd5b3480156101de57600080fd5b506101f26101ed366004611371565b61062d565b005b34801561020057600080fd5b5061021461020f3660046113e6565b610703565b60405190151581526020015b60405180910390f35b34801561023557600080fd5b5061025d7fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e6381565b604051908152602001610220565b6101f2610279366004611410565b610714565b34801561028a57600080fd5b5061021461029936600461147c565b61080c565b3480156102aa57600080fd5b506102c96102b936600461154c565b630a85bd0160e11b949350505050565b6040516001600160e01b03199091168152602001610220565b3480156102ee57600080fd5b5061025d6102fd36600461147c565b60009081526020819052604090206001015490565b34801561031e57600080fd5b5061021461032d36600461147c565b610832565b34801561033e57600080fd5b506101f261034d3660046115b4565b61083b565b34801561035e57600080fd5b5061021461036d36600461147c565b610866565b34801561037e57600080fd5b506101f261038d3660046115b4565b61088b565b34801561039e57600080fd5b506102146103ad36600461147c565b6108c3565b3480156103be57600080fd5b506101f26103cd36600461147c565b610909565b3480156103de57600080fd5b506103f26103ed36600461147c565b61097c565b60405161022091906115f6565b34801561040b57600080fd5b5061025d61041a366004611410565b6109c7565b34801561042b57600080fd5b506101f261043a366004611663565b610a06565b34801561044b57600080fd5b5061025d7fb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc181565b34801561047f57600080fd5b5061021461048e3660046115b4565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b3480156104c357600080fd5b5061025d600081565b3480156104d857600080fd5b5061025d7ffd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f78381565b34801561050c57600080fd5b5061025d61051b366004611721565b610baa565b34801561052c57600080fd5b506102c961053b366004611859565b63bc197c8160e01b95945050505050565b34801561055857600080fd5b506101f261056736600461147c565b610bef565b34801561057857600080fd5b5061025d61058736600461147c565b60009081526001602052604090205490565b3480156105a557600080fd5b506101f26105b43660046115b4565b610c9a565b6101f26105c7366004611721565b610cbf565b3480156105d857600080fd5b506101f26105e736600461190f565b610e9f565b3480156105f857600080fd5b506102c961060736600461192a565b63f23a6e6160e01b95945050505050565b34801561062457600080fd5b5060025461025d565b7fb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc161065781610f37565b60006106678989898989896109c7565b90506106738184610f44565b6000817f4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca8b8b8b8b8b8a6040516106af969594939291906119ac565b60405180910390a383156106f857807f20fda5fd27a1ea7bf5b9567f143ac5470bb059374a27e8f67cb44f946f6d0387856040516106ef91815260200190565b60405180910390a25b505050505050505050565b600061070e82610fd8565b92915050565b600080527fdae2aa361dfd1ca020a396615627d436107c35eff9fe7738a3512819782d70696020527f5ba6852781629bcdcd4bdaa6de76d786f1c64b16acdac474e55bebc0ea157951547fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e639060ff16610791576107918133610ffd565b60006107a18888888888886109c7565b90506107ad8185611050565b6107b98888888861109e565b6000817fc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b588a8a8a8a6040516107f194939291906119ea565b60405180910390a361080281611116565b5050505050505050565b600060025b61081a8361097c565b600381111561082b5761082b6115e0565b1492915050565b60006003610811565b60008281526020819052604090206001015461085681610f37565b6108608383611142565b50505050565b6000806108728361097c565b6003811115610883576108836115e0565b141592915050565b6001600160a01b03811633146108b45760405163334bd91960e11b815260040160405180910390fd5b6108be82826111ec565b505050565b6000806108cf8361097c565b905060018160038111156108e5576108e56115e0565b148061090257506002816003811115610900576109006115e0565b145b9392505050565b3330811461093a5760405163e2850c5960e01b81526001600160a01b03821660048201526024015b60405180910390fd5b60025460408051918252602082018490527f11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5910160405180910390a150600255565b6000818152600160205260408120548060000361099c5750600092915050565b600181036109ad5750600392915050565b428111156109be5750600192915050565b50600292915050565b60008686868686866040516020016109e4969594939291906119ac565b6040516020818303038152906040528051906020012090509695505050505050565b7fb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1610a3081610f37565b8887141580610a3f5750888514155b15610a87576040517fffb03211000000000000000000000000000000000000000000000000000000008152600481018a90526024810186905260448101889052606401610931565b6000610a998b8b8b8b8b8b8b8b610baa565b9050610aa58184610f44565b60005b8a811015610b5b5780827f4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca8e8e85818110610ae557610ae5611a13565b9050602002016020810190610afa919061190f565b8d8d86818110610b0c57610b0c611a13565b905060200201358c8c87818110610b2557610b25611a13565b9050602002810190610b379190611a29565b8c8b604051610b4b969594939291906119ac565b60405180910390a3600101610aa8565b508315610b9d57807f20fda5fd27a1ea7bf5b9567f143ac5470bb059374a27e8f67cb44f946f6d038785604051610b9491815260200190565b60405180910390a25b5050505050505050505050565b60008888888888888888604051602001610bcb989796959493929190611b0a565b60405160208183030381529060405280519060200120905098975050505050505050565b7ffd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783610c1981610f37565b610c22826108c3565b610c5e5781610c31600261126f565b610c3b600161126f565b604051635ead8eb560e01b81526004810193909352176024820152604401610931565b6000828152600160205260408082208290555183917fbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb7091a25050565b600082815260208190526040902060010154610cb581610f37565b61086083836111ec565b600080527fdae2aa361dfd1ca020a396615627d436107c35eff9fe7738a3512819782d70696020527f5ba6852781629bcdcd4bdaa6de76d786f1c64b16acdac474e55bebc0ea157951547fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e639060ff16610d3c57610d3c8133610ffd565b8786141580610d4b5750878414155b15610d93576040517fffb03211000000000000000000000000000000000000000000000000000000008152600481018990526024810185905260448101879052606401610931565b6000610da58a8a8a8a8a8a8a8a610baa565b9050610db18185611050565b60005b89811015610e895760008b8b83818110610dd057610dd0611a13565b9050602002016020810190610de5919061190f565b905060008a8a84818110610dfb57610dfb611a13565b9050602002013590503660008a8a86818110610e1957610e19611a13565b9050602002810190610e2b9190611a29565b91509150610e3b8484848461109e565b84867fc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b5886868686604051610e7294939291906119ea565b60405180910390a350505050806001019050610db4565b50610e9381611116565b50505050505050505050565b6000610eaa81610f37565b610ed47fb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc18361083b565b610efe7fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e638361083b565b610f287ffd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f7838361083b565b610f33600033610c9a565b5050565b610f418133610ffd565b50565b610f4d82610866565b15610f7f5781610f5d600061126f565b604051635ead8eb560e01b815260048101929092526024820152604401610931565b6000610f8a60025490565b905080821015610fb757604051635433660960e01b81526004810183905260248101829052604401610931565b610fc18242611bc4565b600093845260016020526040909320929092555050565b60006001600160e01b03198216630271189760e51b148061070e575061070e82611292565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16610f335760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610931565b6110598261080c565b6110685781610f5d600261126f565b801580159061107d575061107b81610832565b155b15610f335760405163121534c360e31b815260048101829052602401610931565b600080856001600160a01b03168585856040516110bc929190611be5565b60006040518083038185875af1925050503d80600081146110f9576040519150601f19603f3d011682016040523d82523d6000602084013e6110fe565b606091505b509150915061110d82826112c7565b50505050505050565b61111f8161080c565b61112e5780610f5d600261126f565b600090815260016020819052604090912055565b6000828152602081815260408083206001600160a01b038516845290915281205460ff166111e4576000838152602081815260408083206001600160a01b03861684529091529020805460ff1916600117905561119c3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a450600161070e565b50600061070e565b6000828152602081815260408083206001600160a01b038516845290915281205460ff16156111e4576000838152602081815260408083206001600160a01b0386168085529252808320805460ff1916905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a450600161070e565b6000816003811115611283576112836115e0565b600160ff919091161b92915050565b60006001600160e01b03198216637965db0b60e01b148061070e57506301ffc9a760e01b6001600160e01b031983161461070e565b6060826112dc576112d7826112e3565b61070e565b508061070e565b8051156112f35780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b80356001600160a01b038116811461132357600080fd5b919050565b60008083601f84011261133a57600080fd5b50813567ffffffffffffffff81111561135257600080fd5b60208301915083602082850101111561136a57600080fd5b9250929050565b600080600080600080600060c0888a03121561138c57600080fd5b6113958861130c565b965060208801359550604088013567ffffffffffffffff8111156113b857600080fd5b6113c48a828b01611328565b989b979a50986060810135976080820135975060a09091013595509350505050565b6000602082840312156113f857600080fd5b81356001600160e01b03198116811461090257600080fd5b60008060008060008060a0878903121561142957600080fd5b6114328761130c565b955060208701359450604087013567ffffffffffffffff81111561145557600080fd5b61146189828a01611328565b979a9699509760608101359660809091013595509350505050565b60006020828403121561148e57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156114d4576114d4611495565b604052919050565b600082601f8301126114ed57600080fd5b813567ffffffffffffffff81111561150757611507611495565b61151a601f8201601f19166020016114ab565b81815284602083860101111561152f57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806000806080858703121561156257600080fd5b61156b8561130c565b93506115796020860161130c565b925060408501359150606085013567ffffffffffffffff81111561159c57600080fd5b6115a8878288016114dc565b91505092959194509250565b600080604083850312156115c757600080fd5b823591506115d76020840161130c565b90509250929050565b634e487b7160e01b600052602160045260246000fd5b602081016004831061161857634e487b7160e01b600052602160045260246000fd5b91905290565b60008083601f84011261163057600080fd5b50813567ffffffffffffffff81111561164857600080fd5b6020830191508360208260051b850101111561136a57600080fd5b600080600080600080600080600060c08a8c03121561168157600080fd5b893567ffffffffffffffff81111561169857600080fd5b6116a48c828d0161161e565b909a5098505060208a013567ffffffffffffffff8111156116c457600080fd5b6116d08c828d0161161e565b90985096505060408a013567ffffffffffffffff8111156116f057600080fd5b6116fc8c828d0161161e565b9a9d999c50979a969997986060880135976080810135975060a0013595509350505050565b60008060008060008060008060a0898b03121561173d57600080fd5b883567ffffffffffffffff81111561175457600080fd5b6117608b828c0161161e565b909950975050602089013567ffffffffffffffff81111561178057600080fd5b61178c8b828c0161161e565b909750955050604089013567ffffffffffffffff8111156117ac57600080fd5b6117b88b828c0161161e565b999c989b509699959896976060870135966080013595509350505050565b600082601f8301126117e757600080fd5b813567ffffffffffffffff81111561180157611801611495565b8060051b611811602082016114ab565b9182526020818501810192908101908684111561182d57600080fd5b6020860192505b8383101561184f578235825260209283019290910190611834565b9695505050505050565b600080600080600060a0868803121561187157600080fd5b61187a8661130c565b94506118886020870161130c565b9350604086013567ffffffffffffffff8111156118a457600080fd5b6118b0888289016117d6565b935050606086013567ffffffffffffffff8111156118cd57600080fd5b6118d9888289016117d6565b925050608086013567ffffffffffffffff8111156118f657600080fd5b611902888289016114dc565b9150509295509295909350565b60006020828403121561192157600080fd5b6109028261130c565b600080600080600060a0868803121561194257600080fd5b61194b8661130c565b94506119596020870161130c565b93506040860135925060608601359150608086013567ffffffffffffffff8111156118f657600080fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6001600160a01b038716815285602082015260a0604082015260006119d560a083018688611983565b60608301949094525060800152949350505050565b6001600160a01b038516815283602082015260606040820152600061184f606083018486611983565b634e487b7160e01b600052603260045260246000fd5b6000808335601e19843603018112611a4057600080fd5b83018035915067ffffffffffffffff821115611a5b57600080fd5b60200191503681900382131561136a57600080fd5b60008383855260208501945060208460051b8201018360005b86811015611afe57838303601f19018852813536879003601e19018112611aaf57600080fd5b860160208101903567ffffffffffffffff811115611acc57600080fd5b803603821315611adb57600080fd5b611ae6858284611983565b60209a8b019a90955093909301925050600101611a89565b50909695505050505050565b60a0808252810188905260008960c08301825b8b811015611b4b576001600160a01b03611b368461130c565b16825260209283019290910190600101611b1d565b5083810360208501528881527f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff891115611b8457600080fd5b8860051b9150818a60208301370182810360209081016040850152611bac9082018789611a70565b60608401959095525050608001529695505050505050565b8082018082111561070e57634e487b7160e01b600052601160045260246000fd5b818382376000910190815291905056fea2646970667358221220a3a33839bf48746fba00df3e48860c77a2a7ece263460b09ef2bb8735130e05b64736f6c634300081a0033';

type MystikoTimelockControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MystikoTimelockControllerConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MystikoTimelockController__factory extends ContractFactory {
  constructor(...args: MystikoTimelockControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _minDelay: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<MystikoTimelockController> {
    return super.deploy(_minDelay, overrides || {}) as Promise<MystikoTimelockController>;
  }
  override getDeployTransaction(
    _minDelay: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): TransactionRequest {
    return super.getDeployTransaction(_minDelay, overrides || {});
  }
  override attach(address: string): MystikoTimelockController {
    return super.attach(address) as MystikoTimelockController;
  }
  override connect(signer: Signer): MystikoTimelockController__factory {
    return super.connect(signer) as MystikoTimelockController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MystikoTimelockControllerInterface {
    return new utils.Interface(_abi) as MystikoTimelockControllerInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MystikoTimelockController {
    return new Contract(address, _abi, signerOrProvider) as MystikoTimelockController;
  }
}

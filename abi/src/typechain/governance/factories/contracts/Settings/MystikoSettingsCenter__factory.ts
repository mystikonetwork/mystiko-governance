/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, BigNumberish, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type {
  MystikoSettingsCenter,
  MystikoSettingsCenterInterface,
} from '../../../contracts/Settings/MystikoSettingsCenter';

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
        name: '_rollerRegistry',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_relayerRegistry',
        type: 'address',
      },
      {
        internalType: 'address[5]',
        name: '_rollupVerifiers',
        type: 'address[5]',
      },
      {
        internalType: 'address[6]',
        name: '_transactVerifiers',
        type: 'address[6]',
      },
      {
        internalType: 'uint256[5]',
        name: '_auditors',
        type: 'uint256[5]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AuditorIndexError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRollupSize',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotChanged',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NumInputsGreaterThanZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyMystikoDAO',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RollupSizeNotPowerOfTwo',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'publicKey',
        type: 'uint256',
      },
    ],
    name: 'AuditorPublicKeyUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'registry',
        type: 'address',
      },
    ],
    name: 'RelayerRegistryChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'registry',
        type: 'address',
      },
    ],
    name: 'RollerRegistryChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'rollupSize',
        type: 'uint32',
      },
    ],
    name: 'RollupVerifierDisabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'rollupSize',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'RollupVerifierEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'inputNumber',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'outputNumber',
        type: 'uint32',
      },
    ],
    name: 'TransactVerifierDisabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'inputNumber',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'outputNumber',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'TransactVerifierEnabled',
    type: 'event',
  },
  {
    inputs: [],
    name: 'AUDITOR_COUNT',
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
            name: 'roller',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'rollupSize',
            type: 'uint256',
          },
        ],
        internalType: 'struct CanDoRollupParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'canDoRollup',
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
        internalType: 'address',
        name: '_newRelayerRegistry',
        type: 'address',
      },
    ],
    name: 'changeRelayerRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newRollerRegistry',
        type: 'address',
      },
    ],
    name: 'changeRollerRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_rollupSize',
        type: 'uint32',
      },
    ],
    name: 'disableRollupVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_numInputs',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: '_numOutputs',
        type: 'uint32',
      },
    ],
    name: 'disableTransactVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_rollupSize',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: '_rollupVerifier',
        type: 'address',
      },
    ],
    name: 'enableRollupVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_numInputs',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: '_numOutputs',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: '_transactVerifier',
        type: 'address',
      },
    ],
    name: 'enableTransactVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'queryAllAuditorPublicKeys',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'queryAuditorPublicKey',
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
        internalType: 'uint32',
        name: '_rollupSize',
        type: 'uint32',
      },
    ],
    name: 'queryRollupVerifier',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'verifier',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'enabled',
            type: 'bool',
          },
        ],
        internalType: 'struct WrappedVerifier',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_numInputs',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: '_numOutputs',
        type: 'uint32',
      },
    ],
    name: 'queryTransactVerifier',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'verifier',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'enabled',
            type: 'bool',
          },
        ],
        internalType: 'struct WrappedVerifier',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'relayerRegistry',
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
  {
    inputs: [],
    name: 'rollerRegistry',
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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_publicKey',
        type: 'uint256',
      },
    ],
    name: 'updateAuditorPublicKey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

const _bytecode =
  '0x60806040523480156200001157600080fd5b50604051620017c0380380620017c08339810160408190526200003491620005ee565b600080546001600160a01b038881166001600160a01b031990921691909117825560408051808201825286518316815260016020808301828152828752600280835293517fe90b7bceb6e7df5418fb78d8ee546e97c83a08bbccc01a0644d599ccd2a7c2e0805492519188166001600160a81b031993841617600160a01b921515830217905585518087018752838c015188168152808401858152868a5286855290517f679795a0195a1b76cdebb7c51d74e058aee92919b8c3389af86ef24535e8a28c80549251918a16928516929092179015158302179055855180870187528b8701518816815280840185815260048a5286855290517fee60d0579bcffd98e668647d59fec1ff86a7fb340ce572e844f234ae73a6918f80549251918a16928516929092179015158302179055855180870187526060808d01518916825281850186815260088b5287865291517f3a5ea591190eeb3f8fcdced843c78df04ec0dfd42f5510375207515664fa0a7580549351918b1693861693909317901515840217909155865180880188526080808e01518a16825281860187815260108c5288875291517f328b8e687a0a963892a735f0237cb763bbbbf8ba0c1dfe2c221debb32c4bbd8980549351918c1693871693909317901515850217909155875180890189528c518a1681528086018781528b80527fcc69885fda6bcc1a4ace058b4a62bf5e179ea78fd58a1ccd71c22cc9b688792f80885291517f09d41a60c7eb9e1f3f38bbee2eea2761087cd398a4df0eb22dbaa4eaa274957c80549251918d169288169290921790151586021790558851808a018a52868e01518b168152808701888152888d5282885290517fedb38a93e6e2e82dbb40826a878df1d817a37ef13fcaa25248649a90fa47497b80549251918d169288169290921790151586021790558851808a018a528d8a01518b168152808701888152898d52918752517f58e76cff22dd72278c8f84685a17f449f02ff85d2e9a03f82022b6f39564086080549251918c1692871692909217901515850217905587518089018952918c0151891682528185018681528a80527fd9d16d34ffb15ba3a3d852f0d403e2ce1d691fb54de27ac87cd2f993f3ec330f80875292517fdbf00e7ae1b41a7f88200c81b3488ab68158ddd50fc472b3c3e2284a7349346d80549251918c1692871692909217901515850217905587518089018952908c015189168152808501868152868b5282865290517fe28818af7bb947aef01108c00a0155d810d5eea20893e766795b298bc4db781980549251918b16928616929092179015158402179055865180880190975260a08b0151881687528684019485529488529390915292517f42f44160cc2e77bbab1a45023ad285dcfafdd00b6fed6e77933c71a0ddb5df3f805492519190951691909316179115150217905581905b60058110156200049f578181600581106200046d576200046d620006db565b602002015160038260058110620004885762000488620006db565b0155806200049681620006f1565b9150506200044e565b5050600880546001600160a01b039687166001600160a01b0319918216179091556009805495909616941693909317909355506200071992505050565b80516001600160a01b0381168114620004f457600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60405160a081016001600160401b0381118282101715620005345762000534620004f9565b60405290565b6000620005466200050f565b90508060a08301848111156200055b57600080fd5b835b8181101562000580576200057181620004dc565b8352602092830192016200055d565b50505092915050565b60405160009060c081016001600160401b0381118282101715620005b157620005b1620004f9565b60405290508060c0830184811115620005c957600080fd5b835b818110156200058057620005df81620004dc565b835260209283019201620005cb565b60008060008060008061026080888a0312156200060a57600080fd5b6200061588620004dc565b9650602062000626818a01620004dc565b96506200063660408a01620004dc565b955089607f8a01126200064857600080fd5b620006578a60608b016200053a565b94508961011f8a01126200066a57600080fd5b6200067a8a6101008b0162000589565b9350896101df8a01126200068d57600080fd5b620006976200050f565b91890191808b841115620006aa57600080fd5b6101c08b015b84811015620006c95780518352918301918301620006b0565b50809450505050509295509295509295565b634e487b7160e01b600052603260045260246000fd5b6000600182016200071257634e487b7160e01b600052601160045260246000fd5b5060010190565b61109780620007296000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063a592bd69116100a2578063c112de6c11610071578063c112de6c146102f3578063c259e2e614610308578063dbda08291461031b578063dd53f8a11461032e578063deeff7cd1461034157600080fd5b8063a592bd6914610294578063a7d73abb146102aa578063b474c10c146102bd578063bf420c56146102d057600080fd5b806347ff589d116100de57806347ff589d146101f15780637fa4b09c1461020457806385e861eb146102175780639b0a6fea1461028157600080fd5b80630c0d0786146101105780630c8867e6146101255780631f02d715146101385780632d7ea99814610168575b600080fd5b61012361011e366004610d90565b610354565b005b610123610133366004610db4565b610460565b60005461014b906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6101cb610176366004610def565b60408051808201909152600080825260208201525063ffffffff166000908152600260209081526040918290208251808401909352546001600160a01b0381168352600160a01b900460ff1615159082015290565b6040805182516001600160a01b031681526020928301511515928101929092520161015f565b60095461014b906001600160a01b031681565b610123610212366004610e0a565b610598565b6101cb610225366004610e51565b6040805180820182526000808252602091820181905263ffffffff948516815260018252828120939094168452918252918290208251808401909352546001600160a01b0381168352600160a01b900460ff1615159082015290565b61012361028f366004610def565b6106fd565b61029c600581565b60405190815260200161015f565b60085461014b906001600160a01b031681565b6101236102cb366004610d90565b610853565b6102e36102de366004610e84565b61095f565b604051901515815260200161015f565b6102fb6109d7565b60405161015f9190610e96565b610123610316366004610e51565b610a54565b61029c610329366004610eda565b610b7b565b6102e361033c366004610ef3565b610bb9565b61012361034f366004610f05565b610bea565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa15801561039d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c19190610f3c565b6001600160a01b0316146103e85760405163177bc95160e11b815260040160405180910390fd5b6009546001600160a01b03808316911603610416576040516336a1c33f60e01b815260040160405180910390fd5b600980546001600160a01b0319166001600160a01b0383169081179091556040517f5fb1f555c248f03010c7d4689477528a48fa36768f01584e23bb2b7748096e3c90600090a250565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa1580156104a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104cd9190610f3c565b6001600160a01b0316146104f45760405163177bc95160e11b815260040160405180910390fd5b600582106105155760405163318c434560e21b815260040160405180910390fd5b806003836005811061052957610529610f59565b015403610549576040516336a1c33f60e01b815260040160405180910390fd5b806003836005811061055d5761055d610f59565b015560405181815282907f90c1be9f7438bda0c157901e648d96325a6e063a310ed2d94995305b36032def9060200160405180910390a25050565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa1580156105e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106059190610f3c565b6001600160a01b03161461062c5760405163177bc95160e11b815260040160405180910390fd5b8263ffffffff1660000361065357604051639f7bd94b60e01b815260040160405180910390fd5b6040805180820182526001600160a01b038381168083526001602080850182815263ffffffff8a81166000818152948452888520918b16808652918452938890209651875492511515600160a01b026001600160a81b031990931696169590951717909455845190815292830191909152918101919091527f62572f755900ce67d07f23ea841c214cf43511a22d2ea2c19649387fa511cf269060600160405180910390a1505050565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa158015610746573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076a9190610f3c565b6001600160a01b0316146107915760405163177bc95160e11b815260040160405180910390fd5b63ffffffff811615806107ab57506104008163ffffffff16115b156107c9576040516309ad7f4b60e21b815260040160405180910390fd5b6107d4600182610f85565b811663ffffffff166000146107fc576040516322717ff960e01b815260040160405180910390fd5b63ffffffff8116600081815260026020908152604091829020805460ff60a01b1916905590519182527f4690516d72338b0199392ee28062eb371a5370b0df29e5818b46a5386c48b69d910160405180910390a150565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa15801561089c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108c09190610f3c565b6001600160a01b0316146108e75760405163177bc95160e11b815260040160405180910390fd5b6008546001600160a01b03808316911603610915576040516336a1c33f60e01b815260040160405180910390fd5b600880546001600160a01b0319166001600160a01b0383169081179091556040517f92e50816b03798f7049608b42acd59748185fa0c0844c2e29fe3e722454033b590600090a250565b600954604051635fa1062b60e11b81526000916001600160a01b03169063bf420c5690610990908590600401610fa9565b602060405180830381865afa1580156109ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d19190610fe4565b92915050565b60408051600580825260c08201909252606091600091906020820160a08036833701905050905060005b6005811015610a4e5760038160058110610a1d57610a1d610f59565b0154828281518110610a3157610a31610f59565b602090810291909101015280610a4681611006565b915050610a01565b50919050565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa158015610a9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac19190610f3c565b6001600160a01b031614610ae85760405163177bc95160e11b815260040160405180910390fd5b8163ffffffff16600003610b0f57604051639f7bd94b60e01b815260040160405180910390fd5b63ffffffff828116600081815260016020908152604080832094861680845294825291829020805460ff60a01b1916905581519283528201929092527f68975a479ff4df5932418b38e44f50afeedc4dbd4705e245862b81f0f9d2658691015b60405180910390a15050565b600060058210610b9e5760405163318c434560e21b815260040160405180910390fd5b60038260058110610bb157610bb1610f59565b015492915050565b60085460405163dd53f8a160e01b81526000916001600160a01b03169063dd53f8a19061099090859060040161101f565b600054604080516361070aa960e01b8152905133926001600160a01b0316916361070aa99160048083019260209291908290030181865afa158015610c33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c579190610f3c565b6001600160a01b031614610c7e5760405163177bc95160e11b815260040160405180910390fd5b63ffffffff82161580610c9857506104008263ffffffff16115b15610cb6576040516309ad7f4b60e21b815260040160405180910390fd5b610cc1600183610f85565b821663ffffffff16600014610ce9576040516322717ff960e01b815260040160405180910390fd5b6040805180820182526001600160a01b038381168083526001602080850191825263ffffffff88166000818152600283528790209551865493511515600160a01b026001600160a81b0319909416951694909417919091179093558351918252918101919091527fb4fe9f79bc0939e84a9865a56e359050e9a122528a7e9e2943bfaad8ef634b729101610b6f565b6001600160a01b0381168114610d8d57600080fd5b50565b600060208284031215610da257600080fd5b8135610dad81610d78565b9392505050565b60008060408385031215610dc757600080fd5b50508035926020909101359150565b803563ffffffff81168114610dea57600080fd5b919050565b600060208284031215610e0157600080fd5b610dad82610dd6565b600080600060608486031215610e1f57600080fd5b610e2884610dd6565b9250610e3660208501610dd6565b91506040840135610e4681610d78565b809150509250925092565b60008060408385031215610e6457600080fd5b610e6d83610dd6565b9150610e7b60208401610dd6565b90509250929050565b600060408284031215610a4e57600080fd5b6020808252825182820181905260009190848201906040850190845b81811015610ece57835183529284019291840191600101610eb2565b50909695505050505050565b600060208284031215610eec57600080fd5b5035919050565b600060608284031215610a4e57600080fd5b60008060408385031215610f1857600080fd5b610f2183610dd6565b91506020830135610f3181610d78565b809150509250929050565b600060208284031215610f4e57600080fd5b8151610dad81610d78565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b63ffffffff828116828216039080821115610fa257610fa2610f6f565b5092915050565b604081018235610fb881610d78565b6001600160a01b039081168352602084013590610fd482610d78565b8082166020850152505092915050565b600060208284031215610ff657600080fd5b81518015158114610dad57600080fd5b60006001820161101857611018610f6f565b5060010190565b60608101823561102e81610d78565b6001600160a01b03908116835260208401359061104a82610d78565b16602083015260409283013592909101919091529056fea2646970667358221220945edd7d258c0163951921391f6110995c490ad09e50a1302352ff73e545d94164736f6c63430008140033';

type MystikoSettingsCenterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MystikoSettingsCenterConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MystikoSettingsCenter__factory extends ContractFactory {
  constructor(...args: MystikoSettingsCenterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _daoCenter: string,
    _rollerRegistry: string,
    _relayerRegistry: string,
    _rollupVerifiers: [string, string, string, string, string],
    _transactVerifiers: string[],
    _auditors: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish],
    overrides?: Overrides & { from?: string },
  ): Promise<MystikoSettingsCenter> {
    return super.deploy(
      _daoCenter,
      _rollerRegistry,
      _relayerRegistry,
      _rollupVerifiers,
      _transactVerifiers,
      _auditors,
      overrides || {},
    ) as Promise<MystikoSettingsCenter>;
  }
  override getDeployTransaction(
    _daoCenter: string,
    _rollerRegistry: string,
    _relayerRegistry: string,
    _rollupVerifiers: [string, string, string, string, string],
    _transactVerifiers: string[],
    _auditors: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish],
    overrides?: Overrides & { from?: string },
  ): TransactionRequest {
    return super.getDeployTransaction(
      _daoCenter,
      _rollerRegistry,
      _relayerRegistry,
      _rollupVerifiers,
      _transactVerifiers,
      _auditors,
      overrides || {},
    );
  }
  override attach(address: string): MystikoSettingsCenter {
    return super.attach(address) as MystikoSettingsCenter;
  }
  override connect(signer: Signer): MystikoSettingsCenter__factory {
    return super.connect(signer) as MystikoSettingsCenter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MystikoSettingsCenterInterface {
    return new utils.Interface(_abi) as MystikoSettingsCenterInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MystikoSettingsCenter {
    return new Contract(address, _abi, signerOrProvider) as MystikoSettingsCenter;
  }
}

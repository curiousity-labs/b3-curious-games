/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BattleshipImpl,
  BattleshipImplInterface,
} from "../BattleshipImpl";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "team1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "team2",
        type: "address",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "GameFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "team",
        type: "address",
      },
    ],
    name: "TeamReady",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "team",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "target",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isSuccessful",
        type: "bool",
      },
    ],
    name: "TurnFinished",
    type: "event",
  },
  {
    inputs: [],
    name: "currentTurn",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "game_winner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_team1",
        type: "address",
      },
      {
        internalType: "address",
        name: "_team2",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4[15]",
        name: "targets",
        type: "bytes4[15]",
      },
    ],
    name: "setTeamOnePieces",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4[15]",
        name: "targets",
        type: "bytes4[15]",
      },
    ],
    name: "setTeamTwoPieces",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "target",
        type: "bytes4",
      },
    ],
    name: "takeTurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "team1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "team2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600080546001600160a01b03199081169091556001805482169055600280548216905560038054909116905534801561003c57600080fd5b506109478061004c6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063e612c0ad1161005b578063e612c0ad146100f7578063e7d4eb091461010a578063ef61b3201461011d578063f09a40161461013057600080fd5b806373f081ee1461008d57806383cbd06d146100a25780638c8d2ede146100d1578063deb61286146100e4575b600080fd5b6100a061009b36600461078e565b610143565b005b6000546100b5906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6001546100b5906001600160a01b031681565b6003546100b5906001600160a01b031681565b6002546100b5906001600160a01b031681565b6100a06101183660046107b0565b610236565b6100a061012b3660046107b0565b6102fa565b6100a061013e36600461085b565b6103b4565b6003546001600160a01b031615801561016657506002546001600160a01b031633145b156101ae576001546001600160a01b03163303610197576002546101949082906001600160a01b0316610430565b50565b6001546101949082906001600160a01b0316610430565b6003546001600160a01b0316331461020d5760405162461bcd60e51b815260206004820152600d60248201527f4e6f7420796f7572207475726e0000000000000000000000000000000000000060448201526064015b60405180910390fd5b6001546001600160a01b03163303610197576002546101949082906001600160a01b0316610430565b3360009081526006602052604090205460ff16156102965760405162461bcd60e51b815260206004820152600a60248201527f50696563657320536574000000000000000000000000000000000000000000006044820152606401610204565b6001546001600160a01b031633146102f05760405162461bcd60e51b815260206004820152600d60248201527f5465616d204f6e65204f6e6c79000000000000000000000000000000000000006044820152606401610204565b610194813361069d565b3360009081526006602052604090205460ff161561035a5760405162461bcd60e51b815260206004820152600a60248201527f50696563657320536574000000000000000000000000000000000000000000006044820152606401610204565b6002546001600160a01b031633146102f05760405162461bcd60e51b815260206004820152600d60248201527f5465616d2054776f204f6e6c79000000000000000000000000000000000000006044820152606401610204565b600180546001600160a01b0384811673ffffffffffffffffffffffffffffffffffffffff199283168117909355600280549185169190921681179091556040805192835260208301919091527fb60d84e37a6658effce28870b1d123cb86f86409df5888679310c0f276e1f5d291015b60405180910390a15050565b6000546001600160a01b0316156104895760405162461bcd60e51b815260206004820152600c60248201527f47616d65206973204f76657200000000000000000000000000000000000000006044820152606401610204565b6001600160a01b03811660009081526004602090815260408083206001600160e01b03198616845290915290205460ff1660011480156104f157503360009081526005602090815260408083206001600160e01b03198616845260010190915290205460ff16155b1561062357336000908152600560205260408120805482906105159060ff166108a4565b825460ff8083166101009490940a84810291021990911617909255336000908152600560209081526040808320805460ff19908116861782556001600160e01b03198a1685526001918201909352922080549091169091179055909150600f036105d3576000805473ffffffffffffffffffffffffffffffffffffffff1916339081179091556040519081527f1728dd43546edd06fabfe796e5b641a151aa90998bfd1b1ec0ae98c6e77084599060200160405180910390a161061d565b604080513381526001600160e01b03198516602082015260018183015290517f5337bbde7e7c72b09a00941bda0ba1caa9206a8bc93d2247d695caea0a4b6de49181900360600190a15b5061066d565b604080513381526001600160e01b03198416602082015260008183015290517f5337bbde7e7c72b09a00941bda0ba1caa9206a8bc93d2247d695caea0a4b6de49181900360600190a15b6003805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b039290921691909117905550565b60005b600f81101561071c576001600160a01b03821660009081526004602052604081206001918584600f81106106d6576106d66108c3565b602090810291909101516001600160e01b0319168252810191909152604001600020805460ff191660ff9290921691909117905580610714816108d9565b9150506106a0565b506001600160a01b038116600081815260066020908152604091829020805460ff1916600117905590519182527fe2e2b3556c27b5e050482e0af7aac4fa3d28cdbed7ffa0465379328007633f269101610424565b80356001600160e01b03198116811461078957600080fd5b919050565b6000602082840312156107a057600080fd5b6107a982610771565b9392505050565b60006101e08083850312156107c457600080fd5b83601f8401126107d357600080fd5b60405181810181811067ffffffffffffffff8211171561080357634e487b7160e01b600052604160045260246000fd5b60405290830190808583111561081857600080fd5b845b838110156108395761082b81610771565b82526020918201910161081a565b509095945050505050565b80356001600160a01b038116811461078957600080fd5b6000806040838503121561086e57600080fd5b61087783610844565b915061088560208401610844565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff81036108ba576108ba61088e565b60010192915050565b634e487b7160e01b600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361090a5761090a61088e565b506001019056fea2646970667358221220cb5511786960260e3d86274c2f7995bda7af7ef2c9ae8f2689c5c54c855723d264736f6c63430008110033";

type BattleshipImplConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BattleshipImplConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BattleshipImpl__factory extends ContractFactory {
  constructor(...args: BattleshipImplConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BattleshipImpl> {
    return super.deploy(overrides || {}) as Promise<BattleshipImpl>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BattleshipImpl {
    return super.attach(address) as BattleshipImpl;
  }
  override connect(signer: Signer): BattleshipImpl__factory {
    return super.connect(signer) as BattleshipImpl__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BattleshipImplInterface {
    return new utils.Interface(_abi) as BattleshipImplInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BattleshipImpl {
    return new Contract(address, _abi, signerOrProvider) as BattleshipImpl;
  }
}

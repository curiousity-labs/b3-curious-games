/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BattleshipFactory,
  BattleshipFactoryInterface,
} from "../BattleshipFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "implAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "gameAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "teamOne",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "teamTwo",
        type: "address",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "teamTwo",
        type: "address",
      },
    ],
    name: "deployAndChallange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getGames",
    outputs: [
      {
        internalType: "contract BattleshipImpl[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516104ec3803806104ec83398101604081905261002f91610054565b600180546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610459806100936000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063ae783a821461003b578063c04c594714610050575b600080fd5b61004e610049366004610334565b61006e565b005b6100586101bf565b6040516100659190610364565b60405180910390f35b806001600160a01b038116330361008457600080fd5b60015460009061009c906001600160a01b0316610275565b6040517ff09a40160000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b0385811660248301529192509082169063f09a401690604401600060405180830381600087803b15801561010257600080fd5b505af1158015610116573d6000803e3d6000fd5b505060008054815260026020526040812080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0386161790558054909250829150610169906103b1565b9182905550600055604080516001600160a01b03838116825233602083015285168183015290517fd3432ff5c78a4cfac45492c26900080695bc03e553bf581d99afdee4869c3e719181900360600190a1505050565b60606000805467ffffffffffffffff8111156101dd576101dd6103f7565b604051908082528060200260200182016040528015610206578160200160208202803683370190505b50905060005b60005481101561026f5760008181526002602052604090205482516001600160a01b03909116908390839081106102455761024561040d565b6001600160a01b039092166020928302919091019091015280610267816103b1565b91505061020c565b50919050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f090506001600160a01b03811661032f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f455243313136373a20637265617465206661696c656400000000000000000000604482015260640160405180910390fd5b919050565b60006020828403121561034657600080fd5b81356001600160a01b038116811461035d57600080fd5b9392505050565b6020808252825182820181905260009190848201906040850190845b818110156103a55783516001600160a01b031683529284019291840191600101610380565b50909695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036103f057634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fdfea26469706673582212205a9875fac337db2deace46ae8e4e7c7a32660f700a851c790c18f0ec5fd8fdf364736f6c63430008110033";

type BattleshipFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BattleshipFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BattleshipFactory__factory extends ContractFactory {
  constructor(...args: BattleshipFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    implAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BattleshipFactory> {
    return super.deploy(
      implAddress,
      overrides || {}
    ) as Promise<BattleshipFactory>;
  }
  override getDeployTransaction(
    implAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(implAddress, overrides || {});
  }
  override attach(address: string): BattleshipFactory {
    return super.attach(address) as BattleshipFactory;
  }
  override connect(signer: Signer): BattleshipFactory__factory {
    return super.connect(signer) as BattleshipFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BattleshipFactoryInterface {
    return new utils.Interface(_abi) as BattleshipFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BattleshipFactory {
    return new Contract(address, _abi, signerOrProvider) as BattleshipFactory;
  }
}

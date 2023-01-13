/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  ConnectFourFactory,
  ConnectFourFactoryInterface,
} from "../ConnectFourFactory";

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
        internalType: "uint256",
        name: "seasonId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "gameAddress",
        type: "address",
      },
    ],
    name: "NewConnectFourSeasonCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "connectFourGames",
    outputs: [
      {
        internalType: "contract ConnectFour",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deployNewSeason",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getGames",
    outputs: [
      {
        internalType: "contract ConnectFour[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516104ea3803806104ea83398101604081905261002f91610054565b600180546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610457806100936000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806314c7457114610046578063646709b814610061578063c04c5947146100bc575b600080fd5b61004e6100d1565b6040519081526020015b60405180910390f35b61009761006f36600461033c565b60026020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610058565b6100c46101a0565b6040516100589190610355565b60015460009081906100f89073ffffffffffffffffffffffffffffffffffffffff16610270565b60008054815260026020908152604080832080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915592548151908152918201929092529192507fc1416e3176deb73dcc1b40ef4d397d1cb59ea42944a5c34ced782936dc6e59d3910160405180910390a1600080549080610196836103af565b9190505591505090565b60606000805467ffffffffffffffff8111156101be576101be6103f5565b6040519080825280602002602001820160405280156101e7578160200160208202803683370190505b50905060005b60005481101561026a57600081815260026020526040902054825173ffffffffffffffffffffffffffffffffffffffff909116908390839081106102335761023361040b565b73ffffffffffffffffffffffffffffffffffffffff9092166020928302919091019091015280610262816103af565b9150506101ed565b50919050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f0905073ffffffffffffffffffffffffffffffffffffffff8116610337576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f455243313136373a20637265617465206661696c656400000000000000000000604482015260640160405180910390fd5b919050565b60006020828403121561034e57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103a357835173ffffffffffffffffffffffffffffffffffffffff1683529284019291840191600101610371565b50909695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036103ee57634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fdfea2646970667358221220b6254037c42102e0110e52f2029d73256d08bb3905fc920a4240ab03d6e950db64736f6c63430008110033";

type ConnectFourFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConnectFourFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ConnectFourFactory__factory extends ContractFactory {
  constructor(...args: ConnectFourFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    implAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ConnectFourFactory> {
    return super.deploy(
      implAddress,
      overrides || {}
    ) as Promise<ConnectFourFactory>;
  }
  override getDeployTransaction(
    implAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(implAddress, overrides || {});
  }
  override attach(address: string): ConnectFourFactory {
    return super.attach(address) as ConnectFourFactory;
  }
  override connect(signer: Signer): ConnectFourFactory__factory {
    return super.connect(signer) as ConnectFourFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConnectFourFactoryInterface {
    return new utils.Interface(_abi) as ConnectFourFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ConnectFourFactory {
    return new Contract(address, _abi, signerOrProvider) as ConnectFourFactory;
  }
}

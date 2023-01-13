/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Battleship",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Battleship__factory>;
    getContractFactory(
      name: "BattleshipFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BattleshipFactory__factory>;
    getContractFactory(
      name: "ConnectFour",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConnectFour__factory>;
    getContractFactory(
      name: "ConnectFourFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConnectFourFactory__factory>;

    getContractAt(
      name: "Battleship",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Battleship>;
    getContractAt(
      name: "BattleshipFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BattleshipFactory>;
    getContractAt(
      name: "ConnectFour",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConnectFour>;
    getContractAt(
      name: "ConnectFourFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConnectFourFactory>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}

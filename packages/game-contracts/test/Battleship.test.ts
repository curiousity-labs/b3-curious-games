import { Battleship__factory } from './../typechain-types/factories/Battleship__factory';
import { ethers } from "hardhat";
import { Battleship } from "../typechain-types/Battleship";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';

describe("Battleship", () => {
  let battleshipContract: Battleship;

  let account1: SignerWithAddress;
  let account2: SignerWithAddress;

  before(async () => {
    [account1, account2] = await ethers.getSigners();

    // Deploys and initializes game with teams
    expect(
      battleshipContract = await new Battleship__factory(
        account1
        ).deploy(account1.address, account2.address)
      )
  });

  it("Should Deploy contract", async () => {
    const contract = battleshipContract.connect(account1);
    const gameCreatedEvent = await contract.queryFilter(battleshipContract.filters.GameCreated())
    expect(gameCreatedEvent[0].args[0] === account1.address)
  })
})



import { Battleship__factory } from "./../typechain-types/factories/Battleship__factory"
import { ethers } from "hardhat"
import { Battleship } from "../typechain-types/Battleship"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { ERROR_TEAM_ONE_ONLY, ERROR_TEAM_TWO_ONLY, mockTeamOnePieces, mockTeamTwoPieces } from "./helpers/data/battleship"

describe("Battleship", () => {
  let battleshipContract: Battleship

  let account1: SignerWithAddress
  let account2: SignerWithAddress

  beforeEach(async () => {
    [account1, account2] = await ethers.getSigners();

    // Deploys and initializes game with teams
    battleshipContract = await new Battleship__factory(account1).deploy(
      account1.address,
      account2.address
    )
  })

  describe("Setup | Success", async () => {
    it("Should deploy Battleship contract | Creates game", async () => {
      const contract = battleshipContract.connect(account1)
      const gameCreatedEvent = await contract.queryFilter(battleshipContract.filters.GameCreated())
      expect(gameCreatedEvent[0].args[0] === account1.address)
    })

    it("Set team 1 pieces", async () => {
      const contract = battleshipContract.connect(account1)
      const response = await contract.setTeamOnePieces(mockTeamOnePieces)
      await expect(response).to.emit(contract, "TeamReady").withArgs(account1.address)
    })


    it("Set team 2 pieces", async () => {
      const contract = battleshipContract.connect(account2)
      await expect(contract.setTeamTwoPieces(mockTeamTwoPieces)).to.emit(contract, "TeamReady").withArgs(account2.address)
    })


    // it("Should be ready to play", async () => {})
  })

  describe("Setup | REVERT", async () => {
    it("Should revert if another account attempts to set team 1", async () => {
      const contract = battleshipContract.connect(account2)
      await expect(contract.setTeamOnePieces(mockTeamOnePieces)).to.be.revertedWith(ERROR_TEAM_ONE_ONLY)
    })

    it("Should revert if another account attempts to set team 2", async () => {
      const contract = battleshipContract.connect(account1)
      await expect(contract.setTeamTwoPieces(mockTeamOnePieces)).to.be.revertedWith(ERROR_TEAM_TWO_ONLY)
    })

    // it("Should revert if team 2 is already set", async () => {})
    // it("Should revert if team 1 is already set", async () => {})
    // it("Should revert if team 1 attempts to set team 2 pieces", async () => {})
  })

  // describe("Game Play", async () => {
  //   beforeEach(async () => {
  //     // @todo set pieces before following tests
  //   })

  // it("should be ready to play", async () => {})
  // it("should let team 1 to play turn", async () => {})
  // it("should let team 2 play next turn 2", async () => {})
  // it("should finish game by setting winner", async () => {})
  // it("should forfeit game by setting winner", async () => {})
  // })
})

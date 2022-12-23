import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import {
  ERROR_TEAM_ONE_ONLY,
  ERROR_PIECES_SET,
  ERROR_TEAM_TWO_ONLY,
  shipLocationsOneBytes,
  shipLocationsTwoBytes,
  fastForwardLastTurnTeamTwoLead,
  fastForwardLastTurnTeamOneLead,
  ERROR_NOT_TURN,
} from "./helpers/data/battleship"
import { Battleship, Battleship__factory } from '../typechain-types';

describe("Battleship", () => {
  let battleshipContract: Battleship

  let account1: SignerWithAddress
  let account2: SignerWithAddress

  beforeEach(async () => {
    ;[account1, account2] = await ethers.getSigners()

    // Deploys and initializes game with teams
    battleshipContract = await new Battleship__factory(account1).deploy(
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
      await expect(await contract.setTeamOnePieces(shipLocationsOneBytes))
        .to.emit(contract, "TeamReady")
        .withArgs(account1.address)
    })

    it("Set team 2 pieces", async () => {
      const contract = battleshipContract.connect(account2)
      await expect(contract.setTeamTwoPieces(shipLocationsTwoBytes))
        .to.emit(contract, "TeamReady")
        .withArgs(account2.address)
    })

    // it("Should be ready to play", async () => {})
  })

  describe("Setup | REVERT", async () => {
    it("Should revert if another account attempts to set team 1", async () => {
      const contract = battleshipContract.connect(account2)
      await expect(contract.setTeamOnePieces(shipLocationsOneBytes)).to.be.revertedWith(
        ERROR_TEAM_ONE_ONLY
      )
    })

    it("Should revert if another account attempts to set team 2", async () => {
      const contract = battleshipContract.connect(account1)
      await expect(contract.setTeamTwoPieces(shipLocationsOneBytes)).to.be.revertedWith(
        ERROR_TEAM_TWO_ONLY
      )
    })

    it("Should revert if team 1 is already set", async () => {
      const contract = battleshipContract.connect(account1)
      await contract.setTeamOnePieces(shipLocationsOneBytes)
      await expect(contract.setTeamOnePieces(shipLocationsOneBytes)).to.be.revertedWith(ERROR_PIECES_SET)
    })

    it("Should revert if team 2 is already set", async () => {
      const contract = battleshipContract.connect(account2)
      await contract.setTeamTwoPieces(shipLocationsTwoBytes)
      await expect(contract.setTeamTwoPieces(shipLocationsTwoBytes)).to.be.revertedWith(ERROR_PIECES_SET)
    })

  })

  describe("Game Play | Success", async () => {

    beforeEach(async () => {
      const signer1C = battleshipContract.connect(account1)
      await signer1C.setTeamOnePieces(shipLocationsOneBytes)

      const signer2C = battleshipContract.connect(account2)
      await signer2C.setTeamTwoPieces(shipLocationsTwoBytes)
    })

    it("should be ready to play", async () => {
      const contract = battleshipContract.connect(account1)
      const gameCreatedEvents = await contract.queryFilter(battleshipContract.filters.TeamReady())
      expect(gameCreatedEvents.length === 2)
    })

    it("should let team 2 to play first turn", async () => {
      const contract = battleshipContract.connect(account2)
      const target = shipLocationsOneBytes[0]
      await expect(contract.takeTurn(target)).to.emit(contract, "TurnFinished")
        .withArgs(account2.address, target, true)
    })

    it("should let team 1 take second turn", async () => {
      const signer2C = battleshipContract.connect(account2)
      await signer2C.takeTurn(shipLocationsOneBytes[0])

      const signer1C = battleshipContract.connect(account1)
      const target = shipLocationsTwoBytes[0]
      await expect(signer1C.takeTurn(target)).to.emit(signer1C, "TurnFinished")
        .withArgs(account1.address, target, true)
    })

    it("should declare team 1 victor", async () => {
      const signer1C = battleshipContract.connect(account1)
      const signer2C = battleshipContract.connect(account2)

      await fastForwardLastTurnTeamOneLead(signer1C, signer2C);
      await expect(signer1C.takeTurn(shipLocationsTwoBytes[14])).to.emit(signer1C, "GameFinished").withArgs(account1.address)
    })

    it("should declare team 2 victor", async () => {
      const signer1C = battleshipContract.connect(account1)
      const signer2C = battleshipContract.connect(account2)

      await fastForwardLastTurnTeamTwoLead(signer1C, signer2C)
      await expect(signer2C.takeTurn(shipLocationsOneBytes[14])).to.emit(signer2C, "GameFinished").withArgs(account2.address)
    })
    // it("should forfeit game by setting winner", async () => {})
  })

  describe("Game Play | REVERT", async () => {
    let signer1C: Battleship;
    let signer2C: Battleship;

    beforeEach(async () => {
      signer1C = battleshipContract.connect(account1)
      signer2C = battleshipContract.connect(account2)
      
      await signer1C.setTeamOnePieces(shipLocationsOneBytes)
      await signer2C.setTeamTwoPieces(shipLocationsTwoBytes)
    })

    it('should revert if turn 1 tries to go first', async () => {
      await expect(signer1C.takeTurn(shipLocationsTwoBytes[0])).to.be.revertedWith(ERROR_NOT_TURN)
    })
    it('should revert if its not team 2 turn', async () => {
      await signer2C.takeTurn(shipLocationsOneBytes[12])
      await expect(signer2C.takeTurn(shipLocationsOneBytes[0])).to.be.revertedWith(ERROR_NOT_TURN)
    })
    it('should revert if its not team 1 turn', async () => {
      await signer2C.takeTurn(shipLocationsOneBytes[12])
      await signer1C.takeTurn(shipLocationsTwoBytes[12])
      await expect(signer1C.takeTurn(shipLocationsTwoBytes[0])).to.be.revertedWith(ERROR_NOT_TURN)
    })
  })
})

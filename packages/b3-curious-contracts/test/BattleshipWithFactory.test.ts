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
import { Battleship, BattleshipFactory, BattleshipFactory__factory, Battleship__factory } from "../typechain"

describe("Battleship | As Clone", () => {
  let battleshipFactory: BattleshipFactory
  let battleshipContractAddr: string;

  let account1: SignerWithAddress
  let account2: SignerWithAddress

  let battleshipContractSignerOne: Battleship
  let battleshipContractSignerTwo: Battleship

  beforeEach(async () => {
    ;[account1, account2] = await ethers.getSigners()

    // Deploys and initializes game with teams
    const battleshipContractImpl = await new Battleship__factory(account1).deploy()
    battleshipFactory = await new BattleshipFactory__factory(account1).deploy(battleshipContractImpl.address)

    await battleshipFactory.deployAndChallange(account2.address)

    const battleshipContractAddrs = await battleshipFactory.getGames();
    battleshipContractAddr = battleshipContractAddrs[0];
    battleshipContractSignerOne = Battleship__factory.connect(battleshipContractAddr, account1)
    battleshipContractSignerTwo = Battleship__factory.connect(battleshipContractAddr, account2)
  })

  describe("Setup | Success", async () => {
    it("Should deploy Battleship contract | Creates game", async () => {
      const gameCreatedEvent = await battleshipFactory.queryFilter(battleshipFactory.filters.GameCreated())
      expect(gameCreatedEvent[0].args[0] === battleshipContractAddr)
      expect(gameCreatedEvent[0].args[1] === account1.address)
      expect(gameCreatedEvent[0].args[2] === account2.address)
    })

    it("Set team 1 pieces", async () => {
      await expect(await battleshipContractSignerOne.setTeamOnePieces(shipLocationsOneBytes))
        .to.emit(battleshipContractSignerOne, "TeamReady")
        .withArgs(account1.address)
    })

    it("Set team 2 pieces", async () => {
      await expect(battleshipContractSignerTwo.setTeamTwoPieces(shipLocationsTwoBytes))
        .to.emit(battleshipContractSignerTwo, "TeamReady")
        .withArgs(account2.address)
    })

    // it("Should be ready to play", async () => {})
  })

  describe("Setup | REVERT", async () => {
    it("Should revert if another account attempts to set team 1", async () => {
      await expect(battleshipContractSignerTwo.setTeamOnePieces(shipLocationsOneBytes)).to.be.revertedWith(
        ERROR_TEAM_ONE_ONLY
      )
    })

    it("Should revert if another account attempts to set team 2", async () => {
      await expect(battleshipContractSignerOne.setTeamTwoPieces(shipLocationsOneBytes)).to.be.revertedWith(
        ERROR_TEAM_TWO_ONLY
      )
    })

    it("Should revert if team 1 is already set", async () => {
      await battleshipContractSignerOne.setTeamOnePieces(shipLocationsOneBytes)
      await expect(battleshipContractSignerOne.setTeamOnePieces(shipLocationsOneBytes)).to.be.revertedWith(ERROR_PIECES_SET)
    })

    it("Should revert if team 2 is already set", async () => {
      await battleshipContractSignerTwo.setTeamTwoPieces(shipLocationsTwoBytes)
      await expect(battleshipContractSignerTwo.setTeamTwoPieces(shipLocationsTwoBytes)).to.be.revertedWith(ERROR_PIECES_SET)
    })

  })

  describe("Game Play | Success", async () => {

    beforeEach(async () => {
      await battleshipContractSignerOne.setTeamOnePieces(shipLocationsOneBytes)
      await battleshipContractSignerTwo.setTeamTwoPieces(shipLocationsTwoBytes)
    })

    it("should be ready to play", async () => {
      const gameCreatedEvents = await battleshipContractSignerOne.queryFilter(battleshipContractSignerOne.filters.TeamReady())
      expect(gameCreatedEvents.length === 2)
    })

    it("should let team 2 to play first turn", async () => {
      const target = shipLocationsOneBytes[0]
      await expect(battleshipContractSignerTwo.takeTurn(target)).to.emit(battleshipContractSignerTwo, "TurnFinished")
        .withArgs(account2.address, target, true)
    })

    it("should let team 1 take second turn", async () => {
      await battleshipContractSignerTwo.takeTurn(shipLocationsOneBytes[0])

      const target = shipLocationsTwoBytes[0]
      await expect(battleshipContractSignerOne.takeTurn(target)).to.emit(battleshipContractSignerOne, "TurnFinished")
        .withArgs(account1.address, target, true)
    })

    it("should declare team 1 victor", async () => {
      await fastForwardLastTurnTeamOneLead(battleshipContractSignerOne, battleshipContractSignerTwo);
      await expect(battleshipContractSignerOne.takeTurn(shipLocationsTwoBytes[14])).to.emit(battleshipContractSignerOne, "GameFinished").withArgs(account1.address)
    })

    it("should declare team 2 victor", async () => {
      await fastForwardLastTurnTeamTwoLead(battleshipContractSignerOne, battleshipContractSignerTwo)
      await expect(battleshipContractSignerTwo.takeTurn(shipLocationsOneBytes[14])).to.emit(battleshipContractSignerTwo, "GameFinished").withArgs(account2.address)
    })
    // it("should forfeit game by setting winner", async () => {})
  })

  describe("Game Play | REVERT", async () => {
    beforeEach(async () => {
      await battleshipContractSignerOne.setTeamOnePieces(shipLocationsOneBytes)
      await battleshipContractSignerTwo.setTeamTwoPieces(shipLocationsTwoBytes)
    })
    it('should revert if turn 1 tries to go first', async () => {
      await expect(battleshipContractSignerOne.takeTurn(shipLocationsTwoBytes[0])).to.be.revertedWith(ERROR_NOT_TURN)
    })
    it('should revert if its not team 2 turn', async () => {
      await battleshipContractSignerTwo.takeTurn(shipLocationsOneBytes[12])
      await expect(battleshipContractSignerTwo.takeTurn(shipLocationsOneBytes[0])).to.be.revertedWith(ERROR_NOT_TURN)
    })
    it('should revert if its not team 1 turn', async () => {
      await battleshipContractSignerTwo.takeTurn(shipLocationsOneBytes[12])
      await battleshipContractSignerOne.takeTurn(shipLocationsTwoBytes[12])
      await expect(battleshipContractSignerOne.takeTurn(shipLocationsTwoBytes[0])).to.be.revertedWith(ERROR_NOT_TURN)
    })
  })
})

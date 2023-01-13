import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {
  ConnectFour,
  ConnectFourFactory,
  ConnectFourFactory__factory,
  ConnectFour__factory,
} from "../typechain"
import { ethers } from "hardhat"
import { expect } from "chai"
import { BigNumber } from "ethers"
describe.only("ConnectFour", () => {
  let connectFourFactory: ConnectFourFactory
  let [account1, account2]: SignerWithAddress[] = []

  let [gameOneContractSignerOne, gameOneContractSignerTwo]: ConnectFour[] = []

  beforeEach(async () => {
    ;[account1, account2] = await ethers.getSigners()

    // Deploys and initializes game with teams
    const connectFourContractImpl = await new ConnectFour__factory(account1).deploy()
    connectFourFactory = await new ConnectFourFactory__factory(account1).deploy(
      connectFourContractImpl.address
    )

    const response = await (await connectFourFactory.deployNewSeason()).wait()
    const [_, gameAddress] = response.events![0].args!

      ;[gameOneContractSignerOne, gameOneContractSignerTwo] = [
        ConnectFour__factory.connect(gameAddress, account1),
        ConnectFour__factory.connect(gameAddress, account2),
      ]
  })

  describe("Setup | Challenge", async () => {
    it("Should create game", async () => {
      await expect(gameOneContractSignerOne.challenge(account2.address))
        .to.emit(gameOneContractSignerOne, "GameCreated")
        .withArgs(0, account1.address, account2.address)
    })
  })
  describe("Game Play | Success", () => {
    let connectFourGameOneId: BigNumber = BigNumber.from(0);
    beforeEach(async () => {
      const response = await (await gameOneContractSignerOne.challenge(account2.address)).wait();
      [connectFourGameOneId] = response.events![0].args!
    })

    it("Should play first move", async () => {
      await expect(gameOneContractSignerTwo.makeMove(connectFourGameOneId, 0))
        .to.emit(gameOneContractSignerTwo, "TurnTaken")
        .withArgs(account2.address, 0)
    })

    it("Should end with horizontal win; team two", async () => {
      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 0)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 0)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 1)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 1)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 2)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 5)

      await expect(gameOneContractSignerTwo.makeMove(connectFourGameOneId, 3))
        .to.emit(gameOneContractSignerTwo, "GameFinished")
        .withArgs(account2.address, connectFourGameOneId)

    })
    
    it("Should end with veritical win; team one", async () => {
      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 3)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 4)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 1)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 4)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 3)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 4)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 2)      
      await expect(gameOneContractSignerOne.makeMove(connectFourGameOneId, 4))
        .to.emit(gameOneContractSignerOne, "GameFinished")
        .withArgs(account1.address, connectFourGameOneId)
    })
    
    it("Should end with forward angle win; team two", async () => {
      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 1)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 2)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 2)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 3)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 3)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 4)
      
      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 3)      
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 0)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 4)      
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 4)

      await expect(gameOneContractSignerTwo.makeMove(connectFourGameOneId, 4))
        .to.emit(gameOneContractSignerTwo, "GameFinished")
        .withArgs(account2.address, connectFourGameOneId)
    })

    it("Should end with backward angle win; team one", async () => {
      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 3)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 4)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 2)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 3)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 1)
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 2)
      
      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 4)      
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 2)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 1)      
      await gameOneContractSignerOne.makeMove(connectFourGameOneId, 1)

      await gameOneContractSignerTwo.makeMove(connectFourGameOneId, 3)
      await expect(gameOneContractSignerOne.makeMove(connectFourGameOneId, 1))
        .to.emit(gameOneContractSignerOne, "GameFinished")
        .withArgs(account1.address, connectFourGameOneId)
    })
  })

})

  // describe("Game Play | Revert", () => {
  // it("Should prevent team one from going first", async () => { })
  // it("Should prevent random address from playing", async () => {})
  // it("Should revert if invalid column", async () => {})
  // it("Should revert if row is exceeded", async () => {})
  // it("Should revert if challenge is called after game start", async () => {})
  // it("", async () => {})
  // })


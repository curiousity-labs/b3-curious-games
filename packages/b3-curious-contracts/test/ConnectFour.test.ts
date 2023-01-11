import { ConnectFourFactory__factory } from './../typechain/factories/ConnectFourFactory__factory';
import { ConnectFour__factory } from './../typechain/factories/ConnectFour__factory';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ConnectFourFactory } from './../typechain/ConnectFourFactory';
import { ConnectFour } from '../typechain';
import { ethers } from 'hardhat';
import { expect } from 'chai';
describe.only("ConnectFour", () => {
  let connectFourFactory: ConnectFourFactory
  let connectFourGameAddress: string;

  let account1: SignerWithAddress
  let account2: SignerWithAddress

  let connectFourContractSignerOne: ConnectFour
  let connectFourContractSignerTwo: ConnectFour

  beforeEach(async () => {
    ;[account1, account2] = await ethers.getSigners()

    // Deploys and initializes game with teams
    const connectFourContractImpl = await new ConnectFour__factory(account1).deploy()
    connectFourFactory = await new ConnectFourFactory__factory(account1).deploy(connectFourContractImpl.address)

    await connectFourFactory.deployAndChallange(account2.address)

    const battleshipContractAddrs = await connectFourFactory.getGames();
    connectFourGameAddress = battleshipContractAddrs[0];
    connectFourContractSignerOne = ConnectFour__factory.connect(connectFourGameAddress, account1)
    connectFourContractSignerTwo = ConnectFour__factory.connect(connectFourGameAddress, account2)
  })

  describe("Setup | Success", async () => {
    it("Should deploy Connect Fout contract | Create game", async () => {
      const gameCreatedEvent = await connectFourFactory.queryFilter(connectFourFactory.filters.GameCreated())
      expect(gameCreatedEvent[0].args[0] === connectFourGameAddress)
      expect(gameCreatedEvent[0].args[1] === account1.address)
      expect(gameCreatedEvent[0].args[2] === account2.address)
    })
  })
})
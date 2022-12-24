import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const battleshipImplContract = await ethers.getContractFactory("BattleshipImpl");
  const battleshipFactoryContract = await ethers.getContractFactory("BattleshipFactory");

  const battleshipImpl = await battleshipImplContract.deploy();
  const battleshipFactory = await battleshipFactoryContract.deploy(battleshipImpl.address)

  console.log("BattleshipImpl address:", battleshipImpl.address);
  console.log("BattleshipFactory address:", battleshipFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
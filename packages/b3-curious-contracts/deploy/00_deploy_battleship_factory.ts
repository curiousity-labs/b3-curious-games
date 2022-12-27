import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import 'hardhat-deploy';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  try {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;
    ;
    const battleshipImpl = await deploy('BattleshipImpl', {
      from: deployer,
      log: true,
    });
    await deploy('BattleshipFactory', {
      from: deployer,
      args: [battleshipImpl.address],
      log: true,
    });

  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
};

export default func;
func.tags = ['BattleshipFactory'];
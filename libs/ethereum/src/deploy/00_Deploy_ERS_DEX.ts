import { DeployFunction } from 'hardhat-deploy/types';
import { THardhatRuntimeEnvironmentExtended } from '../helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const balloons = await hre.ethers.getContractAt('Balloons', deployer);
  console.log('BALLOONS_ADDRESS', balloons.address);

  await deploy('DEX', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [balloons.address],
    log: true,
    // waitConfirmations: 5,
  });

  const dex = await hre.ethers.getContractAt('DEX', deployer);

  // paste in your front-end address here to get 10 balloons on deploy:
  // scaffold eth wallet or metamask wallet
  console.log('DEPLOY_WALLET_ADDRESS', process.env.DEPLOY_WALLET_ADDRESS);

  await balloons.transfer(
    process.env.DEPLOY_WALLET_ADDRESS,
    '' + 10 * 10 ** 18
  );

  // uncomment to init DEX on deploy:
  console.log(
    'Approving DEX (' + dex.address + ') to take Balloons from main account...'
  );

  console.log('Deployer Address', deployer);
  // If you are going to the testnet make sure your deployer account has enough ETH
  await balloons.approve(dex.address, hre.ethers.utils.parseEther('0.01'));
  console.log('INIT exchange...');
  await dex.init(hre.ethers.utils.parseEther('0.01'), {
    value: hre.ethers.utils.parseEther('0.01'),
    gasLimit: 200000,
  });
};
export default func;
func.tags = ['Balloons', 'DEX'];

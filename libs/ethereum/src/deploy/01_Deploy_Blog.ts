import * as fs from 'fs';
import { DeployFunction } from 'hardhat-deploy/types';

import { THardhatRuntimeEnvironmentExtended } from '../helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const blog = await deploy('Blog', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: ['Blog'],
    log: true,
  });

  // const Blog = await hre.ethers.getContractFactory('Blog');
  // const blog = await Blog.deploy('My blog');
  //await blog.deployed();

  // console.log('Blog signer is:', blog.signer);
  console.log('Blog Address is:', blog.address);

  // write this somewhere else.
  fs.writeFileSync(
    './apps/stackmates/contracts/addresses.ts',
    `
  export const contractAddress = "${blog.address}"
  export const ownerAddress = "${deployer}"
  `
  );
};
export default func;
func.tags = ['Blog'];

import * as fs from 'fs';
import { DeployFunction } from 'hardhat-deploy/types';

import { THardhatRuntimeEnvironmentExtended } from '../helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();

  const Blog = await hre.ethers.getContractFactory('Blog');
  const blog = await Blog.deploy('My blog');

  await blog.deployed();
  // console.log('Blog signer is:', blog.signer);
  console.log('Deployer is:', deployer);

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

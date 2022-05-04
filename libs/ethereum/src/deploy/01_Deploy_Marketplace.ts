import * as fs from 'fs';
import { DeployFunction } from 'hardhat-deploy/types';

import { THardhatRuntimeEnvironmentExtended } from '../helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const NFTMarketplace = await hre.ethers.getContractFactory('NFTMarketplace');
  const marketplace = await NFTMarketplace.deploy();

  await marketplace.deployed();
  console.log('Deployer is:', deployer);

  // write this somewhere else.
  fs.writeFileSync(
    './apps/nft-marketplace/contracts/addresses.ts',
    `
  export const marketplaceAddress = "${marketplace.address}"
  export const ownerAddress = "${deployer}"
  `
  );
};
export default func;
func.tags = ['NFTMarketplace'];

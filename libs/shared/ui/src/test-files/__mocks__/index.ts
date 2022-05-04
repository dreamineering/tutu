import { ContractJSON } from 'ethereum-waffle/dist/esm/ContractJSON';
import * as hardhatJson from 'test-files/__mocks__/hardhat_contracts.basic1.json';

import * as basicERC20ContractJson from './generated/artifacts/test-files/contracts/BasicERC20Contract.sol/BasicERC20Contract.json';
import * as yourContractJson from './generated/artifacts/test-files/contracts/YourContract.sol/YourContract.json';

import { TDeployedHardhatContractsJson } from '~~/models';

export const mockHardhatBasicJson: TDeployedHardhatContractsJson = hardhatJson;
export const mockYourContractJson: ContractJSON = yourContractJson;
export const mockBasicERC20ContractJson: ContractJSON = basicERC20ContractJson;

export * as mockExternalContracts from './external-contracts/cjs/types';
export * from './externalContractsForUseContractLoader';

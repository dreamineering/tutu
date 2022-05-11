/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  createConnectorForExternalContract,
  createConnectorForHardhatContract,
} from '@drmg/shared/ui';
// import { createConnectorForHardhatContract } from '@drmg/shared/ui';

import hardhatContractsJson from '../generated/hardhat_contracts.json';

// import * as hardhatContracts from '../generated/contract-types';
import { hardhatContracts } from '@drmg/ethereum';

// import { DAI } from '@drmg/shared/data-access/smart-contracts';
// import { externalContractsAddressMap } from './externalContracts.config';
// import * as externalContracts from '../generated/external-contracts/esm/types';
// import * as externalContracts from '../generated/external-contracts/types';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * ### Instructions
 * 1. edit externalContracts.config.ts to add your external contract addresses.
 * 2. edit `appContractsConfig` function below and add them to the list
 * 3. run `yarn contracts:build` to generate types for contracts
 * 4. run `yarn deploy` to generate hardhat_contracts.json
 *
 * ### Summary
 * - called  by useAppContracts
 * @returns
 */
export const appContractsConfig = () => {
  try {
    const result = {
      // --------------------------------------------------
      // 🙋🏽‍♂️ Add your hadrdhat contracts here
      // --------------------------------------------------
      YourContract: createConnectorForHardhatContract(
        'YourContract',
        hardhatContracts.YourContract__factory,
        hardhatContractsJson
      ),

      // YourNFT: createConnectorForHardhatContract(
      //   'YourNFT',
      //   hardhatContracts.YourNFT__factory,
      //   hardhatContractsJson
      // ),

      // --------------------------------------------------
      // 🙋🏽‍♂️ Add your external contracts here, make sure to define the address in `externalContractsConfig.ts`
      // --------------------------------------------------
      // ISSUE libraary is failing to build types
      // DAI: createConnectorForExternalContract(
      //   'DAI',
      //   externalContracts.DAI__factory,
      //   externalContractsAddressMap
      // ),

      // --------------------------------------------------
      // 🙋🏽‍♂️ Add your external abi here (unverified contracts)`
      // --------------------------------------------------
      // YourContract: createConnectorForExternalAbi(
      //   'YourContract',
      //   {
      //     [TARGET_NETWORK_INFO.chainId]: {
      //       address: 'xxx',
      //       chainId: TARGET_NETWORK_INFO.chainId,
      //     },
      //   },
      //   hardhatContracts.YourContract__factory.abi,
      //   hardhatContracts.YourContract__factory.connect
      // ),
    } as const;

    return result;
  } catch (e) {
    console.error(
      '❌ appContractsConfig: ERROR with loading contracts please run `yarn contracts:build or yarn contracts:rebuild`.  Then run `yarn deploy`!',
      e
    );
  }

  return undefined;
};

/**
 * ### Summary
 * This type describes all your contracts, it is the return of {@link appContractsConfig}
 */
export type TAppConnectorList = NonNullable<
  ReturnType<typeof appContractsConfig>
>;

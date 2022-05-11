import { contractsContextFactory } from '@drmg/shared/ui';
import { TTypedContract } from '@drmg/shared/ui';

import {
  appContractsConfig,
  TAppConnectorList,
} from '../config/appContracts.config';

/**
 * This file initalises the contractContextFactory and exports the types
 * 🙅🏽‍♂️ You don't need to change this file.
 */

/**
 * #### Summary
 * Call contractContextFactory with the `appContractsConfig` from `appContracts.config.ts`
 *
 * ##### Notes
 * - This will create your ContractContext used by App.tsx
 * - This will create your hooks to access contracts
 * - The type is your contract connect config.
 */
// export const {
//   ContractsAppContext,
//   useAppContractsActions,
//   useAppContracts,
//   useLoadAppContracts,
//   useConnectAppContracts,
// } = contractsContextFactory<
//   keyof TAppConnectorList,
//   TTypedContract<keyof TAppConnectorList, TAppConnectorList>
// >(appContractsConfig);

export const {
  ContractsAppContext,
  useAppContractsActions,
  useAppContracts,
  useLoadAppContracts,
  useConnectAppContracts,
} = contractsContextFactory<
  keyof TAppConnectorList,
  TAppConnectorList,
  TTypedContract<keyof TAppConnectorList, TAppConnectorList>
>(appContractsConfig);

import { contractsContextFactory, TTypedContract } from '@drmg/shared/ui';

import {
  contractConnectorConfig,
  TAppConnectorList,
} from '../config/appContracts.config';

export const {
  ContractsAppContext,
  useAppContractsActions,
  useAppContracts,
  useLoadAppContracts,
  useConnectAppContracts,
} = contractsContextFactory<
  /* the contractNames (keys) in config output */
  keyof TAppConnectorList,
  /* the type of the config output  */
  TAppConnectorList,
  /* A type that infers the value of each contractName: contract pair*/
  TTypedContract<keyof TAppConnectorList, TAppConnectorList>
>(contractConnectorConfig);

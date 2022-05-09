import { NETWORKS } from '../constants';
// import { TNetworkInfo } from '@drmg/shared/ui';
import { TNetworkNames, TNetworkInfo } from '../models';

export const getNetworks = (
  additionalFields: Record<string, any>
): Record<string, TNetworkInfo | any> => {
  const result: Record<TNetworkNames, TNetworkInfo | any> = { ...NETWORKS };
  for (const n in NETWORKS) {
    const names = n as TNetworkNames;
    result[names] = { ...NETWORKS[names], ...additionalFields };
  }

  return result;
};

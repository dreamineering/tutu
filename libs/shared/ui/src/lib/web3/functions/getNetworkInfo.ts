import { NETWORKS, TNetworkNames } from '@drmg/shared/data-access/scaffold-eth';

import { getNetwork } from '@ethersproject/networks';
import { TNetworkInfo } from '@drmg/shared/ui';

export const getNetworkInfo = (
  chainId: number | undefined
): TNetworkInfo | undefined => {
  if (!chainId) return;

  for (const n in NETWORKS) {
    const names = n as TNetworkNames;
    if (NETWORKS[names].chainId === chainId) {
      return NETWORKS[names];
    }
  }

  const network = getNetwork(chainId) ?? {};
  // @ts-expect-error
  const url = network?._defaultProvider?.connection?.url ?? '';
  return { ...network, blockExplorer: '', color: '#666666', url: url };
};

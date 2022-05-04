import { TokenInfo, TokenList } from '@uniswap/token-lists';
import axios from 'axios';
import isEqual from 'lodash.isequal';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '../../context';
import { mergeDefaultUpdateOptions, processQueryOptions, TRequiredKeys } from '../../functions';
import { useEthersUpdater } from '../../hooks/useEthersUpdater';
import { THookResult, TUpdateOptions } from '../../models';
import { keyNamespace } from '../../models/constants';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useDexTokenList' } as const;

/**
 * #### Summary
 * Gets a tokenlist from uniswap ipfs tokenlist
 *
 * ##### ✏️ Notes
 * - you can also point it to another URI
 *
 * @category Hooks
 *
 * @param tokenListUri
 * @param chainId optional, you can filter by a particular chainId
 * @returns (TokenInfo[]) from '@uniswap/token-lists'
 */
export const useDexTokenList = (
  tokenListUri: string = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org',
  chainId?: number,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<TokenInfo[]> => {
  const keys = [{ ...queryKey }, { tokenListUri, chainId }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<TokenInfo[]> => {
      const { tokenListUri, chainId } = keys.queryKey[1];
      let tokenInfo: TokenInfo[] = [];
      const tokenListResp: TokenList = (await axios(tokenListUri)).data as TokenList;
      if (tokenListResp != null) {
        if (chainId) {
          tokenInfo = tokenListResp.tokens.filter((t: TokenInfo) => {
            return t.chainId === chainId;
          });
        } else {
          tokenInfo = tokenListResp.tokens;
        }
      }
      return tokenInfo;
    },
    {
      ...processQueryOptions<TokenInfo[]>(options),
      isDataEqual: (oldResult, newResult) => isEqual(oldResult, newResult),
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? [], refetch, status];
};

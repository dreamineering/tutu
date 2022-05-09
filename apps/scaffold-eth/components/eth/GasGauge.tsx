import React, { FC } from 'react';

import { TGasStationSpeed, useGasPrice } from '@drmg/shared/ui';
import { TEthersProvider, TNetworkInfo } from '@drmg/shared/ui';;

import { Button } from 'antd';

interface IGasGaugeProps {
  chainId: number | undefined;
  speed: TGasStationSpeed;
  provider: TEthersProvider | undefined;
  currentNetwork?: TNetworkInfo;
}

/**
 * Displays gas gauge.  Defaults to mainnet and uses gastation get get data.  You can also provide the data
 * @param props
 * @returns
 */
export const GasGauge: FC<IGasGaugeProps> = (props) => {
  const [gasPrice] = useGasPrice(props.chainId, props.speed, props.currentNetwork);

  return (
    <Button
      onClick={(): void => {
        window.open('https://ethgasstation.info/');
      }}
      size="large"
      shape="round">
      <span style={{ marginRight: 8 }}>
        <span role="img" aria-label="fuelpump">
          ⛽️
        </span>
      </span>
      {gasPrice ?? '❓'}
    </Button>
  );
};

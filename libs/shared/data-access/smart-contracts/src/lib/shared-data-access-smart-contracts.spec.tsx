import { render } from '@testing-library/react';

import SharedDataAccessSmartContracts from './shared-data-access-smart-contracts';

describe('SharedDataAccessSmartContracts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedDataAccessSmartContracts />);
    expect(baseElement).toBeTruthy();
  });
});

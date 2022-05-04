import { render } from '@testing-library/react';

import SharedDataAccessScaffoldEth from './shared-data-access-scaffold-eth';

describe('SharedDataAccessScaffoldEth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedDataAccessScaffoldEth />);
    expect(baseElement).toBeTruthy();
  });
});

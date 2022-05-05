import { render } from '@testing-library/react';

import TopicButton from './topic-button';

describe('TopicButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopicButton topicName={'react'} />);
    expect(baseElement).toBeTruthy();
  });
});

import { Story, Meta } from '@storybook/react';
import { Blockie, IBlockieProps } from './Blockie';

export default {
  component: Blockie,
  title: 'Web3/Blockie',
  argTypes: {},
} as Meta;

const Template: Story<IBlockieProps> = (args) => {
  return (
    <div className="bg-gray-100 p-20">
      <Blockie {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  address: '0x0C0f72931ea185Ca04dc7b18C15348688bB8d94B',
};

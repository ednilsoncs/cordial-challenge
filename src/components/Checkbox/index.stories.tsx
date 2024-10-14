import { Meta, StoryFn } from '@storybook/react';
import { CheckProps } from './index.types';
import Checkbox from './index';

const meta: Meta<CheckProps> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {},
};

const Template: StoryFn<CheckProps> = args => {
  return <Checkbox {...args} />;
};

export const CheckboxDefault = Template.bind({});

CheckboxDefault.args = {
  check: true,
};

export default meta;

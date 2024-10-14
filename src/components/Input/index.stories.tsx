import { Meta, StoryFn } from '@storybook/react';
import { InputProps } from './index.types';
import Input from './index';

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {},
};

const Template: StoryFn<InputProps> = args => {
  return <Input {...args} />;
};

export const InputDefault = Template.bind({});

InputDefault.args = {
  placeholder: 'Placeholder',
};

export default meta;

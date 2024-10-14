import { Meta, StoryFn } from '@storybook/react';
import { LabelProps } from './index.types';
import Label from './index';

const meta: Meta<LabelProps> = {
  title: 'Components/Label',
  component: Label,
  argTypes: {},
};

const Template: StoryFn<LabelProps> = args => {
  return <Label {...args}>Exemple</Label>;
};

export const LabelDefault = Template.bind({});

LabelDefault.args = {};

export default meta;

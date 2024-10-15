import { Meta, StoryFn } from '@storybook/react';
import { ButtonProps } from './index.types';
import Button from './index';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'This is a button component that supports multiple variants, sizes, and can render any React node as its children.',
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      description: 'Defines the appearance of the button.',
      options: ['default', 'outline', 'ghost', 'destructive'],
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'React node to be rendered inside the button',
    },

    size: {
      control: {
        type: 'select',
      },
      description: 'Defines the size of the button.',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

const defaultArgs = {
  variant: 'default',
  children: 'test',
  size: 'default',
} as ButtonProps;

const Template: StoryFn<ButtonProps> = args => {
  return <Button {...args} />;
};

export const ButtonDefault = Template.bind({});

ButtonDefault.args = {
  ...defaultArgs,
};

export const ButtonOutline = Template.bind({});

ButtonOutline.args = {
  ...defaultArgs,
  variant: 'outline',
};

export const ButtonGhost = Template.bind({});

ButtonGhost.args = {
  ...defaultArgs,
  variant: 'ghost',
};

export const ButtonDestructive = Template.bind({});

ButtonDestructive.args = {
  ...defaultArgs,
  variant: 'destructive',
};

export default meta;

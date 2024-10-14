import { Meta, StoryFn } from '@storybook/react';
import { IconBaseProps } from './index.types';
import Icons from './index';

export default {
  title: 'Components/Icons',
} as Meta;

export const ArrowDown: StoryFn<IconBaseProps> = args => (
  <Icons.ArrowDown {...args} />
);

export const ArrowUp: StoryFn<IconBaseProps> = args => (
  <Icons.ArrowUp {...args} />
);

export const ArrowUpDown: StoryFn<IconBaseProps> = args => (
  <Icons.ArrowUpDown {...args} />
);

export const Check: StoryFn<IconBaseProps> = args => <Icons.Check {...args} />;

export const Close: StoryFn<IconBaseProps> = args => <Icons.Close {...args} />;

export const MoreHorizontal: StoryFn<IconBaseProps> = args => (
  <Icons.MoreHorizontal {...args} />
);

export const Search: StoryFn<IconBaseProps> = args => (
  <Icons.Search {...args} />
);

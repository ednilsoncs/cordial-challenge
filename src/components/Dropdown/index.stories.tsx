import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown from './index';
import Button from '../Button';

import Icons from '../Icons';

const meta: Meta = {
  title: 'Components/Dropdown',
  parameters: {
    docs: {
      description: {
        component:
          'This is a dropdown component that supports rendering inside a table. It was built using a portal, and to work properly, you must use the provided trigger and content.',
      },
    },
  },
  component: Dropdown,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Defines whether the dropdown is open or closed.',
    },
    side: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Positions the dropdown in relation to the trigger.',
    },
  },
};

export default meta;

const Template: StoryFn = ({ side }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const headers = [
    { key: 'col1', label: 'Column 1' },
    { key: 'col2', label: 'Column 2' },
    { key: 'col3', label: 'Column 3' },
  ];

  const isColumnVisible = (id: string) => {
    const idIsInList = visibleColumns.find(item => id === item);

    return !!idIsInList;
  };
  const handleSelectColumns = (id: string) => {
    const idIsInList = isColumnVisible(id);

    if (idIsInList) {
      setVisibleColumns(visibleColumns.filter(item => item !== id));
    } else {
      setVisibleColumns([id, ...visibleColumns]);
    }
  };

  return (
    <Dropdown isOpen={isOpen} side={side} onClose={() => setIsOpen(false)}>
      <Dropdown.Trigger onClick={() => setIsOpen(!isOpen)}>
        <Button variant="outline">
          Columns <Icons.ArrowDown />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {headers.map(head => (
          <Dropdown.CheckboxItem
            key={head.key}
            checked={isColumnVisible(head.key)}
            onClick={() => handleSelectColumns(head.key)}>
            {head.label}
          </Dropdown.CheckboxItem>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};

export const DefaultDropdown = Template.bind({});
DefaultDropdown.args = {
  isOpen: true,
  side: 'bottom',
};

/* eslint-disable react/no-array-index-key */
import { Button, Dropdown, Icons, Table } from '@/components';
import { TableItemRef, useTable } from '@/hooks/useTable';
import { StoryFn } from '@storybook/react';
import { useState } from 'react';

const headers = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'firstName', label: 'First Name', type: 'string' },
  { key: 'lastName', label: 'Last Name', type: 'string' },
];

const data = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Brown',
  },
];

const columns: TableItemRef[] = headers.map(head => {
  return {
    key: head.key,
    type: head.type,
    header: () => {
      return <span>{head.label}</span>;
    },

    cell: value => {
      return <span>{value}</span>;
    },
  };
});

export default {
  title: 'Components/Table',
  component: Table,
};

const Template: StoryFn = () => {
  const table = useTable({
    columns,
    data,
    state: {
      totalItems: 4,
      itemsPerPage: 4,
    },
  });

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {table.headerRows.map(header => (
            <Table.Head key={header.key}>{header.element}</Table.Head>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {table.bodyRows.map((row, index) => (
          <Table.Row key={index}>
            {row.map((cell, idx) => (
              <Table.Cell key={idx}>{cell}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const TableWithColumnVisibilityOptions: StoryFn = () => {
  const [isOpenColumnDropDownState, setOpenColumnDropDownState] =
    useState(false);
  const table = useTable({
    columns,
    data,
    state: {
      totalItems: 4,
      itemsPerPage: 4,
    },
  });
  const handleOpenDropDown = (value: boolean) => {
    setOpenColumnDropDownState(value);
  };
  return (
    <div>
      <Dropdown
        isOpen={isOpenColumnDropDownState}
        onClose={() => handleOpenDropDown(false)}>
        <Dropdown.Trigger onClick={() => handleOpenDropDown(true)}>
          <Button variant="outline">
            Columns <Icons.ArrowDown />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          {headers.map(head => {
            return (
              <Dropdown.CheckboxItem
                key={head.key}
                checked={table.isColumnVisible(head.key)}
                onClick={() =>
                  table.onColumnChangeVisibility(
                    !table.isColumnVisible(head.key),
                    head.key,
                  )
                }>
                {head.label}
              </Dropdown.CheckboxItem>
            );
          })}
        </Dropdown.Content>
      </Dropdown>
      <Table>
        <Table.Header>
          <Table.Row>
            {table.headerRows.map(header => (
              <Table.Head key={header.key}>{header.element}</Table.Head>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {table.bodyRows.map((row, index) => (
            <Table.Row key={index}>
              {row.map((cell, idx) => (
                <Table.Cell key={idx}>{cell}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

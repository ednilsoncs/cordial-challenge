/* eslint-disable react/no-array-index-key */
import { Table } from '@/components';
import { TableItemRef, useTable } from '@/hooks/useTable';
import { StoryFn } from '@storybook/react';

const headers = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'firstName', label: 'First Name', type: 'string' },
  { key: 'lastName', label: 'Last Name', type: 'string' },
];

const data = [
  [1, 'John', 'Doe'],
  [2, 'Jane', 'Smith'],
  [3, 'Bob', 'Johnson'],
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
      visibleColumns: ['id', 'firstName', 'lastName'],
      itemsPerPage: 10,
    },
  });

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {headers.map(header => (
            <Table.Head key={header.key}>{header.label}</Table.Head>
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

export const Default = Template.bind({});
Default.args = {};

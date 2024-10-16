import { Button, Input, Table, Icons, Dropdown, Label } from '@/components';
import dayjs from '@/utils/dayjs';
import { TableItemRef, useTable } from '@/hooks/useTable';
import { useCallback, useEffect, useState } from 'react';
import { Data, fetchData } from '@/services/ApiService';
import styles from './styles.module.scss';

const headers = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'firstName', label: 'First Name', type: 'string' },
  { key: 'lastName', label: 'Last Name', type: 'string' },
  { key: 'email', label: 'Email', type: 'string' },
  { key: 'role', label: 'Role', type: 'string' },
  { key: 'lastLogin', label: 'Last Login', type: 'date' },
  { key: 'department', label: 'Department', type: 'string' },
  { key: 'salary', label: 'Salary', type: 'number' },
  { key: 'performanceScore', label: 'Performance Score', type: 'number' },
  { key: 'projects', label: 'Projects', type: 'array' },
  { key: 'skills', label: 'Skills', type: 'array' },
  { key: 'birthDate', label: 'Birth Date', type: 'date' },
  { key: 'isFullTime', label: 'Full Time', type: 'boolean' },
];

const normalizeValue = ({ value, type }: { value: any; type: string }) => {
  if (type === 'string' || type === 'number') {
    return <span>{value}</span>;
  }

  if (type === 'boolean') {
    return <span>{value ? 'true' : 'false'}</span>;
  }

  if (type === 'date') {
    return <span>{dayjs(value).format('DD [of] MMMM')}</span>;
  }

  return <span>{value.toString()}</span>;
};

const columns: TableItemRef[] = headers.map(head => {
  return {
    key: head.key,
    type: head.type,
    header: ({ sortState, onSort, searchTerm, onSearch }) => {
      const isClose = searchTerm === null || searchTerm === undefined;
      return (
        <div className={styles.headFilters}>
          <Dropdown isOpen={!isClose} side="top">
            <Dropdown.Trigger
              onClick={() => {
                if (isClose) {
                  onSearch('');
                } else {
                  onSearch(null);
                }
              }}>
              <Button variant="ghost">
                {isClose ? (
                  <Icons.Search className={styles.icon} />
                ) : (
                  <Icons.Close />
                )}
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item key={head.key}>
                <Input
                  value={searchTerm || ''}
                  onChange={e => onSearch(e.target.value)}
                />
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          {head.label}
          <Button variant="ghost" onClick={() => onSort()}>
            {sortState === 'asc' && <Icons.ArrowUp />}
            {sortState === 'desc' && <Icons.ArrowDown />}
            {sortState === undefined && <Icons.ArrowUpDown />}
          </Button>
        </div>
      );
    },

    cell: value =>
      normalizeValue({
        value,
        type: head.type,
      }),
  };
});

const Example = () => {
  const [isOpenColumnDropDownState, setOpenColumnDropDownState] =
    useState(false);
  const [data, setData] = useState<{ [key: string]: Data }[]>([]);

  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const table = useTable({
    columns,
    data,
    state: {
      totalItems,
      itemsPerPage,
    },
  });

  const handleOpenDropDown = (value: boolean) => {
    setOpenColumnDropDownState(value);
  };

  const getDataApi = useCallback(async () => {
    const apiData = await fetchData({
      filters: table.columnsFilters,
      page: table.currentPage,
      sortOrder: table.sortConfig?.direction,
      sortBy: table.sortConfig?.key,
      search: table.globalSearchTerm,
      pageSize: itemsPerPage,
    });

    setTotalItems(apiData.totalCount);
    setData(apiData.data);
  }, [
    itemsPerPage,
    table.columnsFilters,
    table.currentPage,
    table.globalSearchTerm,
    table.sortConfig?.direction,
    table.sortConfig?.key,
  ]);

  useEffect(() => {
    getDataApi();
  }, [getDataApi]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          onChange={value => table.onGlobalSearch(value.target.value)}
          className={styles.search}
          placeholder="Global search"
        />
        <Dropdown
          isOpen={isOpenColumnDropDownState}
          onClose={() => handleOpenDropDown(false)}>
          <Dropdown.Trigger onClick={() => handleOpenDropDown(true)}>
            <Button variant="outline">
              Columns <Icons.ArrowDown className={styles.icon} />
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
      </div>
      <div className={styles.body}>
        <Table>
          <Table.Header>
            <Table.Row>
              {table.headerRows.map(item => {
                return <Table.Head key={item.key}>{item.element}</Table.Head>;
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {table.bodyRows.map(items => {
              return (
                <Table.Row>
                  {items.map(item => {
                    return <Table.Cell>{item}</Table.Cell>;
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <div className={styles.pagnation}>
        <div className={styles.row}>
          <Label>Row per page</Label>
          <Input
            placeholder="Row per page"
            type="number"
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(parseInt(e.target.value, 10));
            }}
          />
        </div>
        <div className={styles.paginationInformation}>
          <span>
            Page {table.currentPage} of {table.totalPages}
          </span>
        </div>
        <div className={styles.buttonGroup}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Example;

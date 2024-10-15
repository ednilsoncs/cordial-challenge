import {
  act,
  renderHook,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import { Button, Icons, Input } from '@/components';
import { TableItemRef, useTable } from './useTable';

const mockData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Doe', age: 25 },
  { id: 3, name: 'Alice Smith', age: 40 },
];

const mockColumns: TableItemRef[] = [
  {
    key: 'name',
    type: 'string',
    header: ({ sortState, onSort, searchTerm, onSearch }) => (
      <div>
        First Name
        <Button
          data-testid="sort-button-1"
          variant="ghost"
          onClick={() => onSort()}>
          {sortState === 'asc' && <Icons.ArrowUp />}
          {sortState === 'desc' && <Icons.ArrowDown />}
          {sortState === undefined && <Icons.ArrowUpDown />}
        </Button>
        <Input
          data-testid="input-search-1"
          value={searchTerm || ''}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
    ),
    cell: value => <span>{value}</span>,
  },
  {
    key: 'age',
    type: 'number',
    header: ({ sortState, onSort, searchTerm, onSearch }) => (
      <div>
        Age
        <Button variant="ghost" onClick={() => onSort()}>
          {sortState === 'asc' && <Icons.ArrowUp />}
          {sortState === 'desc' && <Icons.ArrowDown />}
          {sortState === undefined && <Icons.ArrowUpDown />}
        </Button>
        <Input
          value={searchTerm || ''}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
    ),
    cell: value => <span>{value}</span>,
  },
];

describe('useTable', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() =>
      useTable({
        data: mockData,
        columns: mockColumns,
        state: { totalItems: 3, itemsPerPage: 2 },
      }),
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.sortConfig).toBeNull();
    expect(result.current.headerRows.length).toBe(2);
    expect(result.current.bodyRows.length).toBe(3);
  });

  it('should go to the next page', () => {
    const { result } = renderHook(() =>
      useTable({
        data: mockData,
        columns: mockColumns,
        state: { totalItems: 3, itemsPerPage: 2 },
      }),
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('should go to the previous page', () => {
    const { result } = renderHook(() =>
      useTable({
        data: mockData,
        columns: mockColumns,
        state: { totalItems: 3, itemsPerPage: 2 },
      }),
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should sort by column to asc', () => {
    const { result } = renderHook(() =>
      useTable({
        data: mockData,
        columns: mockColumns,
        state: { totalItems: 3, itemsPerPage: 2 },
      }),
    );
    render(result.current.headerRows[0].element);
    const sortButton = screen.getByTestId('sort-button-1');

    fireEvent.click(sortButton);

    expect(result.current.sortConfig).toEqual({
      key: 'name',
      direction: 'asc',
    });
  });

  it('should sort by column to desc', () => {
    const { result } = renderHook(() =>
      useTable({
        data: mockData,
        columns: mockColumns,
        state: { totalItems: 3, itemsPerPage: 2 },
      }),
    );

    render(result.current.headerRows[0].element);
    const sortButton = screen.getByTestId('sort-button-1');
    fireEvent.click(sortButton);
    fireEvent.click(sortButton);
    expect(result.current.sortConfig).toEqual({
      key: 'name',
      direction: 'desc',
    });
  });

  it('should allow searching a column', () => {
    const { result } = renderHook(() =>
      useTable({
        data: mockData,
        columns: mockColumns,
        state: { totalItems: 3, itemsPerPage: 2 },
      }),
    );

    render(result.current.headerRows[0].element);
    const inputColumnSearch = screen.getByTestId('input-search-1');
    fireEvent.change(inputColumnSearch, {
      target: {
        value: 'John',
      },
    });
    expect(result.current.columnsFilters.name.search).toBe('John');
  });
  it('should change column visibility', () => {
    const { result } = renderHook(() =>
      useTable({
        data: mockData,
        columns: mockColumns,
        state: { totalItems: 3, itemsPerPage: 2 },
      }),
    );

    act(() => {
      result.current.onColumnChangeVisibility(false, 'name');
    });

    expect(result.current.isColumnVisible('name')).toBe(false);
  });
  it('should handle global search', () => {
    const { result } = renderHook(() =>
      useTable({
        data: mockData,
        columns: mockColumns,
        state: { totalItems: 3, itemsPerPage: 2 },
      }),
    );

    act(() => {
      result.current.onGlobalSearch('Doe');
    });

    expect(result.current.globalSearchTerm).toBe('Doe');
  });
});

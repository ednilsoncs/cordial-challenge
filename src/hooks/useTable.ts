import { useState, useEffect, useCallback } from 'react';

type ISortDirection = 'asc' | 'desc' | undefined;

export interface TableItemRef {
  key: string;
  type: string;
  header: (data: {
    onSort(): void;
    searchTerm: string | null;
    sortState: ISortDirection;
    onSearch(term: string | null): void;
  }) => JSX.Element;
  cell: (value: any) => any;
}

type Data = string | number | boolean | string[];
interface IUseTable {
  columns: TableItemRef[];
  data: { [key: string]: Data }[];
  state: {
    itemsPerPage: number;
    totalItems: number;
  };
}

interface ICell {
  element: JSX.Element;
  key: string;
}

export const useTable = ({
  data,
  columns,
  state: { totalItems, itemsPerPage },
}: IUseTable) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: ISortDirection;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [headerRows, setHeaderRows] = useState<ICell[]>([]);
  const [bodyRows, setBodyRows] = useState<JSX.Element[][]>([]);
  const [columnsFilters, setColumnsFilters] = useState<{
    [key: string]: {
      search: string;
      visible: boolean;
    };
  }>({});

  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');

  const isColumnVisible = useCallback(
    (id: string) => {
      const idIsInList = columnsFilters[id]?.visible;

      if (idIsInList === undefined) {
        return true;
      }
      return !!idIsInList;
    },
    [columnsFilters],
  );
  const onColumnSearchConfigure = useCallback(
    (term: string, key: string) => {
      setColumnsFilters(prev => ({
        ...prev,
        [key]: {
          ...columnsFilters[key],
          search: term,
        },
      }));
    },
    [columnsFilters],
  );
  const onColumnChangeVisibility = (visible: boolean, key: string) => {
    setColumnsFilters(prev => ({
      ...prev,
      [key]: {
        ...columnsFilters[key],
        visible,
      },
    }));
  };

  const onGlobalSearch = useCallback((value: string) => {
    setGlobalSearchTerm(value);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const previousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handleSortColumn = (key: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig && prevConfig.key === key) {
        if (prevConfig.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const getCanPreviousPage = () => currentPage > 0;
  const getCanNextPage = () => currentPage < totalPages - 1;

  useEffect(() => {
    const headersFilters = columns.filter(item => isColumnVisible(item.key));
    const headers = headersFilters.map(column => ({
      key: column.key,
      element: column.header({
        sortState:
          sortConfig?.key === column.key ? sortConfig.direction : undefined,
        searchTerm: columnsFilters[column.key]?.search,
        onSort: () => handleSortColumn(column.key),
        onSearch: (term: string) => onColumnSearchConfigure(term, column.key),
      }),
    }));

    setHeaderRows(headers);

    const rows = data.map(row =>
      headersFilters.map(column => column.cell(row[column.key])),
    );

    setBodyRows(rows);
  }, [
    columns,
    columnsFilters,
    data,
    isColumnVisible,
    onColumnSearchConfigure,
    sortConfig?.direction,
    sortConfig?.key,
  ]);

  return {
    headerRows,
    bodyRows,
    onGlobalSearch,
    previousPage,
    nextPage,
    getCanPreviousPage,
    getCanNextPage,
    currentPage,
    totalPages,
    sortConfig,
    globalSearchTerm,
    onColumnChangeVisibility,
    isColumnVisible,
    columnsFilters,
  };
};

import { useState, useEffect, useMemo, useCallback } from 'react';

type ISortDirection = 'asc' | 'desc' | null;

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
  data: Data[][];
  state: {
    visibleColumns: string[];
    itemsPerPage: number;
  };
}

interface ICell {
  element: JSX.Element;
  key: string;
}

export const useTable = ({
  data,
  columns,
  state: { visibleColumns, itemsPerPage },
}: IUseTable) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: ISortDirection;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [headerRows, setHeaderRows] = useState<ICell[]>([]);
  const [bodyRows, setBodyRows] = useState<JSX.Element[][]>([]);
  const [columnSearchTerms, setColumnSearchTerms] = useState<{
    [key: string]: string | null;
  }>({});
  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');

  const onColumnSearchConfigure = (term: string, key: string) => {
    setColumnSearchTerms(prev => ({ ...prev, [key]: term }));
  };

  const onGlobalSearch = useCallback((value: string) => {
    setGlobalSearchTerm(value);
  }, []);

  const formattedData = useMemo(() => {
    return data.map(row => {
      const record: { [key: string]: Data } = {};
      columns.forEach((column, index) => {
        record[column.key] = row[index];
      });
      return record;
    });
  }, [columns, data]);

  const filteredColumns = useMemo(() => {
    return columns.filter(column => visibleColumns.includes(column.key));
  }, [columns, visibleColumns]);

  const filteredData = useMemo(() => {
    return formattedData.filter(row => {
      const matchesGlobalSearch = filteredColumns.some(column => {
        const value = row[column.key]?.toString().toLowerCase() || '';
        return value.includes(globalSearchTerm.toLowerCase());
      });

      const matchesColumnSearch = filteredColumns.every(column => {
        const searchTerm = columnSearchTerms[column.key]?.toLowerCase() || '';
        const value = row[column.key]?.toString().toLowerCase() || '';
        return value.includes(searchTerm);
      });

      return matchesGlobalSearch && matchesColumnSearch;
    });
  }, [columnSearchTerms, filteredColumns, formattedData, globalSearchTerm]);

  const handleSortColumn = (key: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig && prevConfig.key === key) {
        if (prevConfig.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        if (prevConfig.direction === 'desc') {
          return null;
        }
        return { key, direction: 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };
  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData.length, itemsPerPage]);

  const previousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const getCanPreviousPage = () => currentPage > 0;

  const getCanNextPage = () => currentPage < totalPages - 1;

  useEffect(() => {
    const sortedData = [...filteredData];
    if (sortConfig) {
      sortedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const headers = filteredColumns.map(column => ({
      key: column.key,
      element: column.header({
        sortState: sortConfig?.key === column.key ? sortConfig.direction : null,
        searchTerm: columnSearchTerms[column.key],
        onSort: () => handleSortColumn(column.key),
        onSearch: (term: string) => onColumnSearchConfigure(term, column.key),
      }),
    }));

    setHeaderRows(headers);
    const paginatedData = sortedData.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage,
    );

    const rows = paginatedData.map(row =>
      filteredColumns.map(column => column.cell(row[column.key])),
    );

    setBodyRows(rows);
  }, [
    columnSearchTerms,
    currentPage,
    filteredColumns,
    filteredData,
    itemsPerPage,
    sortConfig,
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
  };
};

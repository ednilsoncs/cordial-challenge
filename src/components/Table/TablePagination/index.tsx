import React from 'react';

interface ITablePaginationProps {
  children: string;
}

const TablePagination: React.FC<ITablePaginationProps> = ({ children }) => {
  return <td>{children}</td>;
};

export default TablePagination;

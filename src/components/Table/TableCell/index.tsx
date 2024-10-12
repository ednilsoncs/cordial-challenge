import React from 'react';

interface ITableCellProps {
  children: string;
}

const TableCell: React.FC<ITableCellProps> = ({ children }) => {
  return <td>{children}</td>;
};

export default TableCell;

import React from 'react';

interface ITableBodyProps {
  children: React.ReactNode;
}

const TableBody: React.FC<ITableBodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;

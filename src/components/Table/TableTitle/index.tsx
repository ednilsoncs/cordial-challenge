import React from 'react';

interface ITableTitleProps {
  children: string;
}

const TableTitle: React.FC<ITableTitleProps> = ({ children }) => {
  return <h2>{children}</h2>;
};

export default TableTitle;

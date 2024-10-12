import React from 'react';

interface ITableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<ITableHeaderProps> = ({ children }) => {
  return <thead>{children}</thead>;
};

export default TableHeader;

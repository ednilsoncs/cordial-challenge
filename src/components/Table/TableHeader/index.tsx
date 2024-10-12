import React from 'react';
import styles from './index.module.scss';

interface ITableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<ITableHeaderProps> = ({ children }) => {
  return <thead style={styles.container}>{children}</thead>;
};

export default TableHeader;

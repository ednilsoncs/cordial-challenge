import React from 'react';
import styles from './index.module.scss';

interface ITableRowProps {
  children: React.ReactNode;
}

const TableRow: React.FC<ITableRowProps> = ({ children }) => {
  return <tr className={styles.container}>{children}</tr>;
};

export default TableRow;

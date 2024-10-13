import React from 'react';
import styles from './index.module.scss';

interface ITableCellProps {
  children: React.ReactNode;
}

const TableCell: React.FC<ITableCellProps> = ({ children }) => {
  return <td className={styles.container}>{children}</td>;
};

export default TableCell;

import React from 'react';
import styles from './index.module.scss';

interface ITableCellProps {
  children: string;
}

const TableCell: React.FC<ITableCellProps> = ({ children }) => {
  return <td className={styles.container}>{children}</td>;
};

export default TableCell;

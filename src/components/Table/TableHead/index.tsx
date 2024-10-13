import React from 'react';
import styles from './index.module.scss';

interface ITableHeadProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<ITableHeadProps> = ({ children }) => {
  return <th className={styles.container}>{children}</th>;
};

export default TableHeader;

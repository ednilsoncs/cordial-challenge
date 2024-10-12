import React from 'react';
import styles from './index.module.scss';

interface ITableBodyProps {
  children: React.ReactNode;
}

const TableBody: React.FC<ITableBodyProps> = ({ children }) => {
  return <tbody style={styles.container}>{children}</tbody>;
};

export default TableBody;

import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableTitle from './TableTitle';
import TableCell from './TableCell';
import TablePagination from './TablePagination';
import styles from './index.module.scss';
import { TableProps } from './index.types';
import TableBody from './TableBody';

const Table: TableProps = ({ children }) => {
  return <table className={styles.container}>{children}</table>;
};

// @component ./TableHeader.tsx
Table.Header = TableHeader;

// @component ./TableHead.tsx
Table.Head = TableHead;

// @component ./TableTitle.tsx
Table.Title = TableTitle;

// @component ./TableRow.tsx
Table.Row = TableRow;

// @component ./TableCell.tsx
Table.Cell = TableCell;

// @component ./TablePagination.tsx
Table.Pagination = TablePagination;

Table.Body = TableBody;

export default Table;

import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableTitle from './TableTitle';
import TableCell from './TableCell';
import styles from './index.module.scss';
import { TableCompositionProps, TableProps } from './index.types';
import TableBody from './TableBody';

const Table: TableProps & TableCompositionProps = ({ children }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>{children}</table>
    </div>
  );
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

Table.Body = TableBody;

export default Table;

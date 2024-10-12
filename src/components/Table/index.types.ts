import TableHead from './TableHead';
import TableRow from './TableRow';
import TableTitle from './TableTitle';
import TableCell from './TableCell';
import TablePagination from './TablePagination';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

type Props = {
  children?: React.ReactNode;
};

type CompositionProps = {
  Head: typeof TableHead;
  Title: typeof TableTitle;
  Cell: typeof TableCell;
  Row: typeof TableRow;
  Pagination: typeof TablePagination;
  Header: typeof TableHeader;
  Body: typeof TableBody;
};

export type TableProps = React.FC<Props> & CompositionProps;

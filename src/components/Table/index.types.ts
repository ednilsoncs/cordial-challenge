import TableHead from './TableHead';
import TableRow from './TableRow';
import TableTitle from './TableTitle';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

type Props = {
  children?: React.ReactNode;
};

export type TableCompositionProps = {
  Head: typeof TableHead;
  Title: typeof TableTitle;
  Cell: typeof TableCell;
  Row: typeof TableRow;
  Header: typeof TableHeader;
  Body: typeof TableBody;
};

export type TableProps = React.FC<Props>;

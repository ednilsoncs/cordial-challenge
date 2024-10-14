import dayjs from './dayjs';

interface IRowHasData {
  row: any;
  columnKey: string;
  searchColumn: string;
  headers: {
    key: string;
    label: string;
    type: string;
  }[];
}

export const rowHasData = ({
  row,
  columnKey,
  searchColumn,
  headers,
}: IRowHasData) => {
  const header = headers.find(head => head.key === columnKey);

  const columnValue = row[headers.findIndex(head => head.key === columnKey)];

  const searchString = searchColumn.toLowerCase();
  if (header) {
    switch (header.type) {
      case 'string':
        return columnValue.toLowerCase().includes(searchString);
      case 'number':
        return String(columnValue).toLowerCase().includes(searchString);
      case 'date':
        return dayjs(columnValue)
          .format('DD [of] MMMM YYYY')
          .toLowerCase()
          .includes(searchString);
      case 'boolean':
        return String(columnValue).toLowerCase().includes(searchString);
      case 'array':
        return (columnValue as string[]).some(val =>
          String(val).toLowerCase().includes(searchString),
        );
      default:
        return false;
    }
  }
  return false;
};

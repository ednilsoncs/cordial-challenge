import { rowHasData } from '@/utils/rowHasData';

export interface ApiResponse {
  data: {
    [key: string]: Data;
  }[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ApiRequest {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

const headers = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'firstName', label: 'First Name', type: 'string' },
  { key: 'lastName', label: 'Last Name', type: 'string' },
  { key: 'email', label: 'Email', type: 'string' },
  { key: 'role', label: 'Role', type: 'string' },
  { key: 'lastLogin', label: 'Last Login', type: 'date' },
  { key: 'department', label: 'Department', type: 'string' },
  { key: 'salary', label: 'Salary', type: 'number' },
  { key: 'performanceScore', label: 'Performance Score', type: 'number' },
  { key: 'projects', label: 'Projects', type: 'array' },
  { key: 'skills', label: 'Skills', type: 'array' },
  { key: 'birthDate', label: 'Birth Date', type: 'date' },
  { key: 'isFullTime', label: 'Full Time', type: 'boolean' },
];

const data = [
  [
    1,
    'John',
    'Doe',
    'john@example.com',
    'Admin',
    '2023-05-01',
    'IT',
    75000,
    4.2,
    ['Project A', 'Project B'],
    ['JavaScript', 'React', 'Node.js'],
    '1985-03-15',
    true,
  ],
  [
    2,
    'Jane',
    'Smith',
    'jane@example.com',
    'User',
    '2023-05-10',
    'Marketing',
    65000,
    3.8,
    ['Project C'],
    ['SEO', 'Content Writing', 'Social Media'],
    '1990-07-22',
    true,
  ],
  [
    3,
    'Bob',
    'Johnson',
    'bob@example.com',
    'User',
    '2023-04-28',
    'Sales',
    70000,
    4.5,
    ['Project D', 'Project E'],
    ['Negotiation', 'CRM', 'Presentation'],
    '1988-11-30',
    false,
  ],
  [
    4,
    'Alice',
    'Brown',
    'alice@example.com',
    'Manager',
    '2023-05-05',
    'HR',
    80000,
    4.7,
    ['Project F'],
    ['Recruitment', 'Training', 'Conflict Resolution'],
    '1982-09-18',
    true,
  ],
];

export type Data = string | number | boolean | string[];

export async function fetchData({
  page,
  pageSize,
  sortBy,
  sortOrder,
  search,
  filters,
}: ApiRequest): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    try {
      let filteredData = [...data];
      let filteredHeaders = [...headers];

      if (filters) {
        filteredHeaders = headers.filter(header => {
          const columnFilter = filters[header.key];
          return columnFilter?.visible !== false;
        });
      }

      if (filters) {
        filteredData = filteredData.filter(row => {
          return Object.keys(filters).every(columnKey => {
            const { search: searchColumn, visible } = filters[columnKey];

            if ((visible === undefined || visible) && searchColumn) {
              return rowHasData({
                row,
                columnKey,
                searchColumn,
                headers,
              });
            }

            return true;
          });
        });
      }

      if (search) {
        filteredData = filteredData.filter(row =>
          filteredHeaders.some(header =>
            rowHasData({
              row,
              columnKey: header.key,
              searchColumn: search,
              headers,
            }),
          ),
        );
      }

      if (sortBy && sortOrder) {
        filteredData.sort((a, b) => {
          const aValue = a[headers.findIndex(header => header.key === sortBy)];
          const bValue = b[headers.findIndex(header => header.key === sortBy)];

          if (sortOrder === 'asc') {
            if (aValue < bValue) {
              return -1;
            }
            if (aValue > bValue) {
              return 1;
            }
            return 0;
          }
          if (aValue > bValue) {
            return -1;
          }
          if (aValue < bValue) {
            return 1;
          }
          return 0;
        });
      }

      const totalCount = filteredData.length;

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedData = filteredData.slice(start, end);

      const formattedData = paginatedData.map(row => {
        const record: { [key: string]: Data } = {};
        filteredHeaders.forEach(column => {
          record[column.key] =
            row[headers.findIndex(header => header.key === column.key)];
        });
        return record;
      });

      resolve({
        data: formattedData,
        totalCount,
        page,
        pageSize,
      });
    } catch (err) {
      reject(err);
    }
  });
}

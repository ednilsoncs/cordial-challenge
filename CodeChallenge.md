# React Table Component Code Challenge

## Background
Your task is to create a highly flexible and adaptable React component for a table that can be used in various scenarios. This component should serve as a foundation for different screens within the app, each with its own unique requirements. All features should be configurable, allowing them to be turned on or off as needed.

## API Schema
For this challenge, you should mock the backend API. Here's the schema for the API:

```typescript
interface ApiResponse {
  data: any[];
  totalCount: number;
  page: number;
  pageSize: number;
}

interface ApiRequest {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Mock API function (you need to implement this)
async function fetchData(request: ApiRequest): Promise<ApiResponse> {
  // Implement mock data fetching logic here
}
```

## Requirements
1. Display data based on provided header and data arrays
2. Implement sortable columns (configurable per column)
3. Implement flexible search functionality (global, column-specific, or both)
4. Add pagination with configurable page size
5. Add the ability to customize which columns are shown
6. Ensure all features can be individually configurable
7. Use the provided mock API for data fetching
8. Implement Storybook to showcase different implementations and configurations of the table component

## Data
```javascript
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
  { key: 'isFullTime', label: 'Full Time', type: 'boolean' }
];

const data = [
  [1, 'John', 'Doe', 'john@example.com', 'Admin', '2023-05-01', 'IT', 75000, 4.2, ['Project A', 'Project B'], ['JavaScript', 'React', 'Node.js'], '1985-03-15', true],
  [2, 'Jane', 'Smith', 'jane@example.com', 'User', '2023-05-10', 'Marketing', 65000, 3.8, ['Project C'], ['SEO', 'Content Writing', 'Social Media'], '1990-07-22', true],
  [3, 'Bob', 'Johnson', 'bob@example.com', 'User', '2023-04-28', 'Sales', 70000, 4.5, ['Project D', 'Project E'], ['Negotiation', 'CRM', 'Presentation'], '1988-11-30', false],
  [4, 'Alice', 'Brown', 'alice@example.com', 'Manager', '2023-05-05', 'HR', 80000, 4.7, ['Project F'], ['Recruitment', 'Training', 'Conflict Resolution'], '1982-09-18', true]
];
```

## Implementation Guidelines
1. You must build this component from scratch without using any external libraries for table functionality, sorting, searching, or pagination.
2. You may use React and TypeScript, but no other third-party libraries are allowed for the table component itself.
3. Implement your own logic for sorting, searching, and pagination.
4. For date handling, you may use a third-party library of your choice (e.g., date-fns, moment.js).
5. Use Storybook to showcase different implementations and configurations of your table component. This will allow you to demonstrate the component's flexibility and various use cases.

Feel free to expand on this structure and add any additional features or optimizations you think would be valuable. Good luck!

import { rowHasData } from '@/utils/rowHasData';
import { fetchData, ApiRequest, ApiResponse } from './ApiService';

const mockData = [
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
];

describe('fetchData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return paginated data correctly when there are no filters or search', async () => {
    const request: ApiRequest = { page: 1, pageSize: 2 };
    const expectedResponse: ApiResponse = {
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: 'Admin',
          lastLogin: '2023-05-01',
          department: 'IT',
          salary: 75000,
          performanceScore: 4.2,
          projects: ['Project A', 'Project B'],
          skills: ['JavaScript', 'React', 'Node.js'],
          birthDate: '1985-03-15',
          isFullTime: true,
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          role: 'User',
          lastLogin: '2023-05-10',
          department: 'Marketing',
          salary: 65000,
          performanceScore: 3.8,
          projects: ['Project C'],
          skills: ['SEO', 'Content Writing', 'Social Media'],
          birthDate: '1990-07-22',
          isFullTime: true,
        },
      ],
      totalCount: mockData.length,
      page: 1,
      pageSize: 2,
    };

    const result = await fetchData(request);
    expect(result).toEqual(expectedResponse);
  });

  it('should filter data based on search term', async () => {
    const request: ApiRequest = { page: 1, pageSize: 2, search: 'John' };
    const expectedResponse: ApiResponse = {
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: 'Admin',
          lastLogin: '2023-05-01',
          department: 'IT',
          salary: 75000,
          performanceScore: 4.2,
          projects: ['Project A', 'Project B'],
          skills: ['JavaScript', 'React', 'Node.js'],
          birthDate: '1985-03-15',
          isFullTime: true,
        },
      ],
      totalCount: 1,
      page: 1,
      pageSize: 2,
    };

    const result = await fetchData(request);
    expect(result).toEqual(expectedResponse);
    expect(rowHasData).toHaveBeenCalled();
  });

  it('should sort data by specified column', async () => {
    const request: ApiRequest = {
      page: 1,
      pageSize: 2,
      sortBy: 'lastName',
      sortOrder: 'asc',
    };
    const expectedResponse: ApiResponse = {
      data: [
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          role: 'User',
          lastLogin: '2023-05-10',
          department: 'Marketing',
          salary: 65000,
          performanceScore: 3.8,
          projects: ['Project C'],
          skills: ['SEO', 'Content Writing', 'Social Media'],
          birthDate: '1990-07-22',
          isFullTime: true,
        },
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: 'Admin',
          lastLogin: '2023-05-01',
          department: 'IT',
          salary: 75000,
          performanceScore: 4.2,
          projects: ['Project A', 'Project B'],
          skills: ['JavaScript', 'React', 'Node.js'],
          birthDate: '1985-03-15',
          isFullTime: true,
        },
      ],
      totalCount: mockData.length,
      page: 1,
      pageSize: 2,
    };

    const result = await fetchData(request);
    expect(result).toEqual(expectedResponse);
  });

  it('should apply filters correctly', async () => {
    const request: ApiRequest = {
      page: 1,
      pageSize: 2,
      filters: {
        department: { search: 'IT', visible: true },
      },
    };

    const expectedResponse: ApiResponse = {
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: 'Admin',
          lastLogin: '2023-05-01',
          department: 'IT',
          salary: 75000,
          performanceScore: 4.2,
          projects: ['Project A', 'Project B'],
          skills: ['JavaScript', 'React', 'Node.js'],
          birthDate: '1985-03-15',
          isFullTime: true,
        },
      ],
      totalCount: 1,
      page: 1,
      pageSize: 2,
    };

    const result = await fetchData(request);
    expect(result).toEqual(expectedResponse);
    expect(rowHasData).toHaveBeenCalled();
  });

  it('should handle empty results gracefully', async () => {
    const request: ApiRequest = { page: 1, pageSize: 2, search: 'Nonexistent' };

    const expectedResponse: ApiResponse = {
      data: [],
      totalCount: 0,
      page: 1,
      pageSize: 2,
    };

    const result = await fetchData(request);
    expect(result).toEqual(expectedResponse);
  });
});

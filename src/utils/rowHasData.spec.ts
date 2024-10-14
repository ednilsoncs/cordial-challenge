import { rowHasData } from './rowHasData';

const headers = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'firstName', label: 'First Name', type: 'string' },
  { key: 'lastName', label: 'Last Name', type: 'string' },
  { key: 'lastLogin', label: 'Last Login', type: 'date' },
  { key: 'isFullTime', label: 'Full Time', type: 'boolean' },
  { key: 'projects', label: 'Projects', type: 'array' },
];

describe('rowHasData', () => {
  it('should return true if searching for a string that exists in a row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'firstName',
        searchColumn: 'jo',
        headers,
      }),
    ).toBe(true);
  });

  it('should return false if searching for a string that not exists in a row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'lastName',
        searchColumn: 'smith',
        headers,
      }),
    ).toBe(false);
  });

  it('should return true if searching for a number that exists in a row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'id',
        searchColumn: '1',
        headers,
      }),
    ).toBe(true);
  });

  it('should return false if searching for a number that not exists in a row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'id',
        searchColumn: '2',
        headers,
      }),
    ).toBe(false);
  });

  it('should return true if searching for a date that exists in a row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'lastLogin',
        searchColumn: '01 of may 2023',
        headers,
      }),
    ).toBe(true);
  });

  it('should return false if searching for a date that not exists in a row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'lastLogin',
        searchColumn: '2022',
        headers,
      }),
    ).toBe(false);
  });

  it('should return true if searching for a boolean that exists in a row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'isFullTime',
        searchColumn: 'true',
        headers,
      }),
    ).toBe(true);
  });

  it('should return false if searching for a boolean that not exists in a row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'isFullTime',
        searchColumn: 'false',
        headers,
      }),
    ).toBe(false);
  });

  it('should return true if searching for a value that exists in an array inside the row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'projects',
        searchColumn: 'project a',
        headers,
      }),
    ).toBe(true);
  });

  it('should return false if searching for a value that not exists in an array inside the row.', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'projects',
        searchColumn: 'project c',
        headers,
      }),
    ).toBe(false);
  });

  it('should return false for unknown column key', () => {
    const row = [
      '1',
      'John',
      'Doe',
      '2023-05-01',
      'true',
      ['Project A', 'Project B'],
    ];
    expect(
      rowHasData({
        row,
        columnKey: 'unknownKey',
        searchColumn: 'value',
        headers,
      }),
    ).toBe(false);
  });
});

import { Table } from '@/components';
import styles from './styles.module.scss';

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

const Example = () => {
  return (
    <div className={styles.container}>
      <Table>
        <Table.Header>
          <Table.Row>
            {headers.map(item => {
              return <Table.Head key={item.key}>{item.label}</Table.Head>;
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            {headers.map(item => {
              return <Table.Cell key={item.key}>{item.label}</Table.Cell>;
            })}
          </Table.Row>
          <Table.Row>
            {headers.map(item => {
              return <Table.Cell key={item.key}>{item.label}</Table.Cell>;
            })}
          </Table.Row>
          <Table.Row>
            {headers.map(item => {
              return <Table.Cell key={item.key}>{item.label}</Table.Cell>;
            })}
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default Example;

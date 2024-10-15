import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './index.stories';

const { TableDefault } = composeStories(stories);

describe('Table Component Tests', () => {
  describe('Table default', () => {
    it('Should render the table headers correctly', () => {
      render(<TableDefault />);

      const headers = ['ID', 'First Name', 'Last Name'];
      headers.forEach(header => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
    });

    it('Should render all the table rows and cells correctly', () => {
      render(<TableDefault />);

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(5);

      const data = [
        { id: '1', firstName: 'John', lastName: 'Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Smith' },
        { id: '3', firstName: 'Bob', lastName: 'Johnson' },
        { id: '4', firstName: 'Alice', lastName: 'Brown' },
      ];

      data.forEach(({ id, firstName, lastName }) => {
        expect(screen.getByText(id)).toBeInTheDocument();
        expect(screen.getByText(firstName)).toBeInTheDocument();
        expect(screen.getByText(lastName)).toBeInTheDocument();
      });
    });
  });
});

import { composeStories } from '@storybook/react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import * as stories from './index.stories';

const { TableDefault, TableWithColumnVisibilityOptions } =
  composeStories(stories);

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

  describe('Table With Column Visibility Options', () => {
    it('Should render the table and dropdown button', () => {
      render(<TableWithColumnVisibilityOptions />);

      expect(screen.getByText('Columns')).toBeInTheDocument();
    });

    it('Should dropdown content be hide for default', () => {
      render(<TableWithColumnVisibilityOptions />);

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('Should toggle dropdown when the button is clicked', () => {
      render(<TableWithColumnVisibilityOptions />);

      fireEvent.click(screen.getByText('Columns'));

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('Should show column visibility options in the dropdown', () => {
      render(<TableWithColumnVisibilityOptions />);

      fireEvent.click(screen.getByText('Columns'));

      const dropDownContent = screen.getByRole('menu');

      const headers = ['ID', 'First Name', 'Last Name'];
      headers.forEach(header => {
        expect(within(dropDownContent).getByText(header)).toBeInTheDocument();
      });
    });

    it('Should toggle column visibility when an option is clicked', () => {
      render(<TableWithColumnVisibilityOptions />);

      fireEvent.click(screen.getByText('Columns'));

      const dropDownContent = screen.getByRole('menu');
      const tableElement = screen.getByRole('table');
      expect(within(tableElement).getByText('First Name')).toBeInTheDocument();
      const firstNameCheckbox = within(dropDownContent).getByText('First Name');
      fireEvent.click(firstNameCheckbox);

      expect(
        within(tableElement).queryByText('First Name'),
      ).not.toBeInTheDocument();
    });
  });
});

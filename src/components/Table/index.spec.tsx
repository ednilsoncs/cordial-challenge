import { composeStories } from '@storybook/react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import * as stories from './index.stories';

const {
  TableDefault,
  TableWithColumnVisibilityOptions,
  TableWithPaginationOptions,
  TableColumnSortingOptions,
  TableColumnSearchOptions,
} = composeStories(stories);

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
      const firstNameCheckbox = within(dropDownContent).getByText('First Name');
      fireEvent.click(firstNameCheckbox);

      expect(
        within(tableElement).queryByText('First Name'),
      ).not.toBeInTheDocument();
    });
  });
  describe('Table With Pagination Options', () => {
    it('Should go to the next page when the "Next" button is clicked', () => {
      render(<TableWithPaginationOptions />);

      expect(screen.getByText('Page 1 of 4')).toBeInTheDocument();

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(screen.getByText('Page 2 of 4')).toBeInTheDocument();
    });

    it('Should go to the previous page when the "Previous" button is clicked', () => {
      render(<TableWithPaginationOptions />);

      fireEvent.click(screen.getByText('Next'));
      expect(screen.getByText('Page 2 of 4')).toBeInTheDocument();

      const previousButton = screen.getByText('Previous');
      fireEvent.click(previousButton);

      expect(screen.getByText('Page 1 of 4')).toBeInTheDocument();
    });
  });

  describe('Table with Sorting Options', () => {
    it('Should sort the table when the sort up button is clicked', () => {
      render(<TableColumnSortingOptions />);

      const idSortButton = screen.queryAllByTestId('sort-icon-button')[0];
      fireEvent.click(idSortButton);
      expect(
        within(idSortButton).getAllByTestId('sort-icon-up')[0],
      ).toBeInTheDocument();

      fireEvent.click(idSortButton);
    });

    it('Should sort the table when the sort down button is clicked', () => {
      render(<TableColumnSortingOptions />);

      const idSortButton = screen.queryAllByTestId('sort-icon-button')[0];
      fireEvent.click(idSortButton);
      fireEvent.click(idSortButton);
      expect(
        within(idSortButton).getAllByTestId('sort-icon-down')[0],
      ).toBeInTheDocument();

      fireEvent.click(idSortButton);
    });
  });
  describe('Table with Search Options', () => {
    it('Should update the global search input', () => {
      render(<TableColumnSearchOptions />);

      const globalSearchInput = screen.getByPlaceholderText('Global search');

      fireEvent.change(globalSearchInput, { target: { value: 'John' } });

      expect(globalSearchInput).toHaveValue('John');
    });
    it('Should open search dropdown and search for a column', () => {
      render(<TableColumnSearchOptions />);

      const searchButton = screen.getAllByRole('button')[0];

      fireEvent.click(searchButton);
      const dropDownContent = screen.getByRole('menu');
      const inputInDropdown = within(dropDownContent).getByRole('textbox');

      fireEvent.change(inputInDropdown, { target: { value: 'Random value' } });

      expect(inputInDropdown).toHaveValue('Random value');
    });

    it('Should close search dropdown and search for a column', () => {
      render(<TableColumnSearchOptions />);

      const searchButton = screen.getAllByRole('button')[0];

      fireEvent.click(searchButton);
      const dropDownContent = screen.getByRole('menu');
      const inputInDropdown = within(dropDownContent).getByRole('textbox');
      fireEvent.click(searchButton);
      expect(inputInDropdown).not.toBeInTheDocument();
    });
  });
});

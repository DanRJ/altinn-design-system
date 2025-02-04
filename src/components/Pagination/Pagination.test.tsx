import React from 'react';
import { render as renderRtl, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PaginationProps } from './Pagination';
import { Pagination } from './Pagination';

const user = userEvent.setup();

const render = (props: Partial<PaginationProps> = {}) => {
  renderRtl(
    <Pagination
      {...defaultProps}
      {...props}
    />,
  );
};

const defaultProps: PaginationProps = {
  numberOfRows: 20,
  rowsPerPageOptions: [5, 10, 15, 20],
  rowsPerPage: 5,
  onRowsPerPageChange: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn(),
  rowsPerPageText: 'Rader per side',
  pageDescriptionText: 'av',
};

describe('Pagination', () => {
  it('should call onRowsPerPageChange when option in select is clicked', async () => {
    const onRowsPerPageChange = jest.fn();

    render({ onRowsPerPageChange });

    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '10' }),
    );

    expect(onRowsPerPageChange).toHaveBeenCalledTimes(1);
  });

  it('should call onRowsPerPageChange when option in select is clicked', async () => {
    const onRowsPerPageChange = jest.fn();

    render({ onRowsPerPageChange });

    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '10' }),
    );

    expect(onRowsPerPageChange).toHaveBeenCalledTimes(1);
  });

  it('setCurrentPage should be updated when firstPageIcon is clicked', async () => {
    const setCurrentPage = jest.fn();

    render({ setCurrentPage });

    await user.click(screen.getByTestId('first-page-icon'));

    expect(setCurrentPage).toHaveBeenCalledTimes(1);
  });

  it('setCurrentPage should be updated when firstPageIcon is clicked using key press enter', async () => {
    const setCurrentPage = jest.fn();

    render({ setCurrentPage });

    await user.type(screen.getByTestId('first-page-icon'), '{Space}');

    expect(setCurrentPage).toHaveBeenCalledTimes(1);
  });

  it('setCurrentPage should be updated when firstPageIcon is clicked using key press tab and enter', async () => {
    const setCurrentPage = jest.fn();

    render({ setCurrentPage });

    await user.keyboard('{Tab}');
    await user.keyboard('{Tab}');
    await user.keyboard('{Enter}');

    expect(setCurrentPage).toHaveBeenCalledTimes(1);
  });

  it('Description text should be rendered correctly', () => {
    const pageDescriptionText = 'av';
    const currentPage = 2;
    const rowsPerPage = 5;
    const numberOfRows = 100;

    render({
      rowsPerPage,
      pageDescriptionText,
      currentPage,
      numberOfRows,
    });

    const text = screen.getByTestId('description-text');

    expect(text).toHaveTextContent('11-15 av 100');
  });
});

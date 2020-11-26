import React from 'react';
import TablePaginationActions from "./paginationActions";
import TablePagination from "@material-ui/core/TablePagination";

interface Props {
  page: number,
  rowsPerPage: number,
  count: number,
  options?: any[],
  onChange: Function
}

export default ({page, rowsPerPage, count, onChange, options}: Props) => {

  function handleChangePage(
  _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  newPage: number,
  ) {
    onChange && onChange(newPage, rowsPerPage);
  }

  function handleChangeRowsPerPage(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const newRowsPerPage = Number.parseInt(event.target.value, 10);
    const newPage = 0;
    onChange && onChange(newPage, newRowsPerPage);
  }

  return (
    <TablePagination
      rowsPerPageOptions={options ? options : [10, 20, 30]}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      labelRowsPerPage='条/页'
      SelectProps={{
        inputProps: { 'aria-label': '条/页' },
        native: true,
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  )
}
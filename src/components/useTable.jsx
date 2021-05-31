import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination as MuiTablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
}));

export default function useTable(records, headCells, filterFn) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stableSort = (array, comparator) => {
    console.log("records: ", records);
    if (array) {
      const stabilizedThis =
        array.length > 0 ? array.map((el, index) => [el, index]) : [];
      stabilizedThis.sort((a, b) => {
        const direction = comparator(a[0], b[0]);
        if (direction !== 0) return direction;
        return a[1] - b[1];
      });

      return stabilizedThis.map((el) => el[0]);
    }

    return [];
  };

  const descendingComparator = (a, b, orderByProp) => {
    if (b[orderByProp] < a[orderByProp]) return -1;
    if (b[orderByProp] > a[orderByProp]) return 1;
    return 0;
  };

  const getComparator = (fromOrder, orderByProp) =>
    fromOrder === "desc"
      ? (a, b) => descendingComparator(a, b, orderByProp)
      : (a, b) => -descendingComparator(a, b, orderByProp);

  const recordsAfterPagingAndSorting = () =>
    stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );

  const TableContainer = ({ children }) => (
    <Table className={classes.table}>{children}</Table>
  );

  const TableHeader = () => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const TablePagination = () => (
    <MuiTablePagination
      component="div"
      count={records.length}
      rowsPerPage={rowsPerPage}
      page={page}
      rowsPerPageOptions={pages}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      labelRowsPerPage="Registros por página"
      labelDisplayedRows={({ from, to, count }) =>
        `Mostrando de ${from} até ${to} (Total: ${count})`
      }
    />
  );

  return {
    TableContainer,
    TableHeader,
    TablePagination,
    recordsAfterPagingAndSorting,
  };
}

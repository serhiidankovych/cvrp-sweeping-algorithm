import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { routesLength, totalLength } from "../../utils/sweepingUtils";
const LengthTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Change this value to set the number of rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="nodes table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ROUTE INDEX</TableCell>
              <TableCell align="right">LENGTH</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routesLength
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.routeIndex}>
                  <TableCell align="right">{row.routeIndex + 1}</TableCell>
                  <TableCell align="right">{row.length.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell>TOTAL LENGTH</TableCell>
              <TableCell align="right">{totalLength.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // You can customize the options as per your requirement
        component="div"
        count={routesLength.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default LengthTable;

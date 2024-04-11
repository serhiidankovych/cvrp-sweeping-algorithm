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
import { nodesCoordinates } from "../../data/data";
const NodesTable = () => {
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
              <TableCell>NODE</TableCell>
              <TableCell align="right">X</TableCell>
              <TableCell align="right">Y</TableCell>
              <TableCell align="right">DEMAND</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodesCoordinates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.node}>
                  <TableCell component="th" scope="row">
                    {row.node}
                  </TableCell>
                  <TableCell align="right">{row.x}</TableCell>
                  <TableCell align="right">{row.y}</TableCell>
                  <TableCell align="right">{row.demand}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // You can customize the options as per your requirement
        component="div"
        count={nodesCoordinates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default NodesTable;

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from '@mui/material';
import axios from 'axios';
import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';

interface Column {
  id: 'username' | 'name' | 'gender' | 'registered';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

interface Person {
  id: string;
  login: {
    username: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  gender: 'male' | 'female';
  registered: {
    date: string;
  };
}

const PeopleList = () => {
  //* States */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Array<Person>>([]);

  //* Components */
  const columns: readonly Column[] = [
    {id: 'username', label: 'Username'},
    {id: 'name', label: 'Name'},
    {id: 'gender', label: 'Gender'},
    {id: 'registered', label: 'Registered Date'},
  ];

  //* Functions */
  const fetchPeople = async () => {
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?page=${page + 1}&results=${rowsPerPage}`
      );
      if (response) {
        const people = response?.data?.results;
        setRows(people);
      }
    } catch (error) {
      console.log(error.message, '<== error');
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderColumns = useMemo(() => {
    return columns.map(column => (
      <TableCell key={column.id}>{column.label}</TableCell>
    ));
  }, [columns]);

  const renderRows = useMemo(() => {
    if (rows.length) {
      return rows.map((person: Person, idx) => (
        <TableRow
          key={idx}
          sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
          <TableCell>{person.login.username}</TableCell>
          <TableCell>{person.name.first}</TableCell>
          <TableCell>{person.gender}</TableCell>
          <TableCell>{person.registered.date}</TableCell>
        </TableRow>
      ));
    }
  }, [rows]);

  //** Lifecycles */
  useEffect(() => {
    fetchPeople();
  }, [page, rowsPerPage]);

  return (
    <Box mt={4}>
      <Paper elevation={0} sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>{renderColumns}</TableRow>
            </TableHead>
            <TableBody>{renderRows}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={50}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PeopleList;

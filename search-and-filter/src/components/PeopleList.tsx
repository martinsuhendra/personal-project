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
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {connect} from 'react-redux';
import {useAppSelector} from '../hooks/redux.hooks';
import {
  IFiltrationActionModel,
  ISortActionModel,
  setFiltration,
  setOrderFiltration,
} from '../redux/filtrationReducer';
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';
interface Column {
  id: 'username' | 'name' | 'email' | 'gender' | 'registered';
  label: string;
  sorted: boolean;
  sortOrder?: 'ascend' | 'desc';
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
  email: string;
  gender: 'male' | 'female';
  registered: {
    date: string;
  };
}

interface PeopleListProps {
  setFiltration: (payload: IFiltrationActionModel) => void;
  setOrderFiltration: (payload: ISortActionModel) => void;
}

interface Params {
  page: number;
  results: number;
  pageSize: number;
  keyword?: string;
  gender?: string;
  sortBy?: string;
  sortOrder?: string;
}

const initialColumn: Array<Column> = [
  {id: 'username', label: 'Username', sorted: false},
  {id: 'name', label: 'Name', sorted: true, sortOrder: null},
  {id: 'email', label: 'Email', sorted: true, sortOrder: null},
  {id: 'gender', label: 'Gender', sorted: true, sortOrder: null},
  {id: 'registered', label: 'Registered Date', sorted: true, sortOrder: null},
];

const PeopleList: FunctionComponent<PeopleListProps> = ({
  setFiltration,
  setOrderFiltration,
}) => {
  //* States */
  const [rows, setRows] = useState<Array<Person>>([]);
  const [columns, setColumns] = useState<Array<Column>>(initialColumn);

  const {keyword, gender, page, rowsPerPage, sortBy, sortOrder, pageSize} =
    useAppSelector(state => state.reducer.filtration);

  //* Functions */
  const fetchPeople = async () => {
    const params: Params = {
      page: page + 1,
      results: rowsPerPage,
      pageSize,
    };

    if (keyword) params.keyword = keyword;
    if (gender !== 'all') params.gender = gender;
    if (sortBy !== '') params.sortBy = sortBy;
    if (sortOrder !== '') params.sortOrder = sortOrder;

    try {
      const response = await axios({
        method: 'get',
        url: 'https://randomuser.me/api/',
        params,
      });

      if (response) {
        const people = response?.data?.results;
        setRows(people);
      }
    } catch (error) {
      console.log(error.message, '<== error');
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setFiltration({name: 'page', value: newPage});
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setFiltration({name: 'page', value: 0});
    setFiltration({name: 'rowsPerPage', value: +event.target.value});
  };

  const handleChangeSort = ({sortBy, sortOrder}: ISortActionModel) => {
    setOrderFiltration({
      sortBy,
      sortOrder,
    });
  };

  const renderColumns = useMemo(() => {
    return columns.map(column => (
      <TableCell variant="head" key={column.id}>
        <Grid alignItems="center" container spacing={1} columns={6}>
          <Grid item xs={5}>
            <Typography>{column.label}</Typography>
          </Grid>
          {column.sorted && (
            <Grid
              container
              direction="column"
              alignItems="stretch"
              item
              xs={1}
              mr={1}
            >
              <Grid item>
                <IconButton
                  onClick={() =>
                    handleChangeSort({sortBy: column.id, sortOrder: 'ascend'})
                  }
                  disableRipple
                >
                  <ArrowDropUp
                    color={
                      column.sortOrder === 'ascend' ? 'primary' : 'disabled'
                    }
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() =>
                    handleChangeSort({sortBy: column.id, sortOrder: 'desc'})
                  }
                  disableRipple
                >
                  <ArrowDropDown
                    color={column.sortOrder === 'desc' ? 'primary' : 'disabled'}
                  />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </TableCell>
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
          <TableCell>{person.email}</TableCell>
          <TableCell>{person.gender}</TableCell>
          <TableCell>{person.registered.date}</TableCell>
        </TableRow>
      ));
    }
  }, [rows]);

  //** Lifecycles */
  useEffect(() => {
    fetchPeople();
  }, [page, rowsPerPage, keyword, gender, sortBy, sortOrder]);

  useEffect(() => {
    if (sortBy === '' && sortOrder === '') {
      setColumns(initialColumn);
    } else {
      const rehydrateColumns = columns.map(column => {
        if (column.id === sortBy) {
          return {...column, sortOrder} as Column;
        }
        return column as Column;
      });
      setColumns(rehydrateColumns);
    }
  }, [sortBy, sortOrder]);

  return (
    <Box mt={4}>
      <Paper elevation={0} sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{maxHeight: 440}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>{renderColumns}</TableRow>
            </TableHead>
            <TableBody>{renderRows}</TableBody>
          </Table>
        </TableContainer>
        <Box mt={4}>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={50}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default connect(null, {setFiltration, setOrderFiltration})(PeopleList);

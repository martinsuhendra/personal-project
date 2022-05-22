import React, {FunctionComponent, useState} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
  Grid,
} from '@mui/material';

const SearchAndFilter: FunctionComponent = () => {
  //* States
  const [gender, setGender] = useState('');

  //* Functions
  const onChangeGender: (event: SelectChangeEvent) => void = e => {
    setGender(e.target.value as string);
  };

  //* Utilities

  return (
    <Grid container mt={1} spacing={2} columns={3} alignItems="stretch">
      <Grid item>
        <TextField sx={{minWidth: '24rem'}} label="Search" variant="outlined" />
      </Grid>
      <Grid item xs>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Age"
            onChange={onChangeGender}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
        <Button variant="outlined" sx={{height: '100%'}}>
          Reset Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchAndFilter;

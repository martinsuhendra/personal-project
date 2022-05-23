import React, {
  ChangeEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Grid,
  OutlinedInput,
  InputAdornment,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  IFiltrationActionModel,
  setFiltration,
  resetFiltration,
} from '../redux/filtrationReducer';
import {connect} from 'react-redux';
import {useAppSelector} from '../hooks/redux.hooks';
import {useDebounce} from '../hooks/helpers.hooks';

interface FiltrationProps {
  setFiltration: (payload: IFiltrationActionModel) => void;
  resetFiltration: () => void;
}

const Filtration: FunctionComponent<FiltrationProps> = ({
  setFiltration,
  resetFiltration,
}) => {
  //* States
  const [keyword, setKeyword] = useState('');
  const {gender} = useAppSelector(state => state.reducer.filtration);

  //* Utilities
  const theme = useTheme();
  const debounced = useDebounce(keyword, 500);

  //* Functions
  const onChangeGender: (event: SelectChangeEvent) => void = e => {
    setFiltration({
      name: 'gender',
      value: e.target.value,
    });
  };

  const onChangeKeyword: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
  };

  const onResetFiltration = () => {
    resetFiltration();
    setKeyword('');
  };

  //* Lifecycles */
  useEffect(() => {
    setFiltration({
      name: 'keyword',
      value: debounced,
    });
  }, [debounced]);

  return (
    <Grid container mt={1} spacing={2} columns={3} alignItems="stretch">
      <Grid item xs>
        <FormControl>
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            sx={{minWidth: '24rem'}}
            label="Search"
            onChange={onChangeKeyword}
            value={keyword}
            endAdornment={
              <InputAdornment
                sx={{marginRight: theme.spacing(1)}}
                position="end"
              >
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} label="Gender" onChange={onChangeGender}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
        <Button
          onClick={onResetFiltration}
          variant="outlined"
          sx={{height: '100%'}}
        >
          Reset Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default connect(null, {setFiltration, resetFiltration})(Filtration);

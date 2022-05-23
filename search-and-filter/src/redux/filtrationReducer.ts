import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the filtration state
export interface FiltrationState {
  keyword: string | null;
  gender: 'male' | 'female' | 'all';
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortOrder: string;
  pageSize: number;
}

export interface IFiltrationActionModel {
  name: string;
  value: string | number;
}
export interface ISortActionModel {
  sortBy: string;
  sortOrder: string;
}

// Define the initial state using that type
const initialState: FiltrationState = {
  keyword: null,
  gender: 'all',
  page: 0,
  rowsPerPage: 10,
  sortBy: '',
  sortOrder: '',
  pageSize: 10,
};

const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFiltration: (state, action: PayloadAction<IFiltrationActionModel>) => {
      const {payload} = action;
      return (state = {
        ...state,
        [payload.name]: payload.value,
      });
    },
    setOrderFiltration: (state, action: PayloadAction<ISortActionModel>) => {
      const {payload} = action;
      const {sortBy, sortOrder} = payload;
      return (state = {
        ...state,
        sortBy,
        sortOrder,
        pageSize: 5,
      });
    },
    resetFiltration: () => {
      return initialState;
    },
  },
});

export const {setFiltration, setOrderFiltration, resetFiltration} =
  filtrationSlice.actions;
export default filtrationSlice.reducer;

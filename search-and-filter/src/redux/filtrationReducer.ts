import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SET_FILTRATION} from './action-types';

// Define a type for the filtration state
export interface FiltrationState {
  keyword: string | null;
  gender: 'male' | 'female' | null;
}

interface IFiltrationActionModel {
  name: string;
  value: string | 'male' | 'female' | null;
}

// Define the initial state using that type
const initialState: FiltrationState = {
  keyword: null,
  gender: null,
};

export const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFiltration: (state, action: PayloadAction<IFiltrationActionModel>) => {
      const {type, payload} = action;
      switch (type) {
        case SET_FILTRATION:
          state = {
            ...state,
            [payload.name]: payload.value,
          };
          break;

        default:
          break;
      }
    },
  },
});

export const {setFiltration} = filtrationSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default filtrationSlice.reducer;

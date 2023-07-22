import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getToken from '../../api/getToken';
import { setErrorMessage } from './errorsSlice';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';

const stateName = 'login';
export const login = createAsyncThunk(
  `${stateName}/fetch`,
  async ({ log, pass }, { dispatch }) => {
    try {
      const { token } = await getToken(log, pass);
      return { token };
    } catch (error) {
      dispatch(setErrorMessage({ error: error.message }));
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: stateName,
  initialState: initialStateCreator(stateName),
  reducers: { logout: () => {} },
  extraReducers: (builder) => {
    extraReducerCreator(builder)(login, stateName);
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

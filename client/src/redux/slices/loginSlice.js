import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getToken from '../../api/getToken';
import { setErrorMessage } from './errorsSlice';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';
import { setToken } from '../../localstorage/localstorage';

const stateName = 'login';
export const login = createAsyncThunk(
  `${stateName}/fetch`,
  async ({ loginOrEmail, password }, { dispatch }) => {
    try {
      const { token } = await getToken(loginOrEmail, password);
      setToken(token);
      return true;
    } catch (error) {
      dispatch(setErrorMessage({ error: error.message }));
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: stateName,
  initialState: initialStateCreator(stateName),
  reducers: {
    logout: (state) => {
      state.login = null;
      setToken(null);
    },
  },
  extraReducers: (builder) => {
    extraReducerCreator(builder)(login, stateName);
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

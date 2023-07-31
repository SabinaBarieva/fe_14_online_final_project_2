import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getToken from '../../api/getToken';
import { setErrorMessage } from './errorsSlice';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';
import { setToken } from '../../localstorage/localstorage';
// import clearBasket from './basketSlice/clearBasket';

const stateName = 'login';
const initialState = initialStateCreator(stateName);
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
export const logout = createAsyncThunk(
  `${stateName}/logout`,
  (_, { getState }) => {
    setToken(null);
    let state = getState()[stateName];
    state = initialState;
  }
);
const loginSlice = createSlice({
  name: stateName,
  initialState,
  extraReducers: (builder) => {
    extraReducerCreator(builder)(login, stateName);
  },
});
export default loginSlice.reducer;

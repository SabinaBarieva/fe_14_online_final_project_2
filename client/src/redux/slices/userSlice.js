import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUserInformation from '../../api/getUserInformation';
import { setErrorMessage } from './errorsSlice';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';
import { login, logout } from './loginSlice';

const stateName = 'user';
const initialState = initialStateCreator(stateName);
export const fetchUserInfo = createAsyncThunk(
  'user-info/fetch',
  async (_, { dispatch }) => {
    try {
      return await getUserInformation();
    } catch (error) {
      dispatch(setErrorMessage({ error: error.message }));
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: stateName,
  initialState,
  extraReducers: (builder) => {
    extraReducerCreator(builder)(fetchUserInfo, stateName);
    builder.addCase(login.fulfilled, (_, action) => {
      action.asyncDispatch(fetchUserInfo());
    });
    builder.addCase(logout.fulfilled, () => initialState);
  },
});
export default userSlice.reducer;

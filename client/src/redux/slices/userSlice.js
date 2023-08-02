import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUserInformation from '../../api/getUserInformation';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';
import { login, logout } from './loginSlice';
import { handleAppError2 } from '../../errors/errors';

const stateName = 'user';
const initialState = initialStateCreator(stateName);
export const fetchUserInfo = createAsyncThunk(
  'user-info/fetch',
  (_, { dispatch }) => handleAppError2(dispatch)(() => getUserInformation())
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

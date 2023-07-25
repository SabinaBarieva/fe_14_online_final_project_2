import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUserInformation from '../../api/getUserInformation';
import { setErrorMessage } from './errorsSlice';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';
import { login } from './loginSlice';

const stateName = 'user';
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
  initialState: initialStateCreator(stateName),
  reducers: {
    resetUserInfo: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    extraReducerCreator(builder)(fetchUserInfo, stateName);
    builder.addCase(login.fulfilled, (_, action) => {
      action.asyncDispatch(fetchUserInfo());
    });
  },
});
export const { resetUserInfo } = userSlice.actions;
export default userSlice.reducer;

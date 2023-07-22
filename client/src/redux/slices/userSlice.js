import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUserInformation from '../../api/getUserInformation';
import { setErrorMessage } from './errorsSlice';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';

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
      state.isFetching = false;
      state.isFetched = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    extraReducerCreator(builder)(fetchUserInfo, stateName);
  },
});
export const { resetUserInfo } = userSlice.actions;
export default userSlice.reducer;

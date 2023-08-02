import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUserInformation from '../../api/getUserInformation';
import { setErrorMessage } from './errorsSlice';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';
import { login, logout } from './loginSlice';
import { getToken } from '../../localstorage/localstorage';
import { updateCustomer } from '../../api/customer';

export const mergeUser = createAsyncThunk(
  'user/merge',
  async (_, { getState }) => {
    // const isLoggedIn = getToken() && true;
    console.log('mergeUser func');
    try {
      // const userData = getState().user.user;
      // const remoteUser = isLoggedIn ? await getUserInformation() : [];
      //
      await updateCustomer();
      const user = await getUserInformation();
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

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
  reducers: {
    clearUser: (state) => {
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
    builder.addCase(logout.fulfilled, () => initialState);
  },
});
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

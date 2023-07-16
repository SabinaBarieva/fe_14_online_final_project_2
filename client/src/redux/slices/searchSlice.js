import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    statusValue: '',
    statusInput: false,
    statusSelect: false,
    statusIconType: 'search',
    statusInputClass: 'fade',
  },
  reducers: {
    showSearchIcon: (state) => {
      state.statusIconType = 'search';
    },
    showCloseIcon: (state) => {
      state.statusIconType = 'close';
    },
    toggleInput: (state) => {
      state.statusInput = !state.statusInput;
    },
    setInputClassFade: (state) => {
      state.statusInputClass = 'fade';
    },
    setInputClassFadeOut: (state) => {
      state.statusInputClass = 'fadeOut';
    },
    setSelect: (state, action) => {
      state.statusSelect = action.payload;
    },
    setValue: (state, action) => {
      state.statusValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const {
  showSearchIcon,
  showCloseIcon,
  toggleInput,
  setInputClassFade,
  setInputClassFadeOut,
  setSelect,
  setValue,
} = searchSlice.actions;

const delay = (ms) => {
  return new Promise((resolve) => {
    try {
      setTimeout(() => resolve(), ms);
    } catch (error) {
      console.error(error);
      resolve();
    }
  });
};

export const classChange = createAsyncThunk(
  'search/classChange',
  async (_, { dispatch, getState }) => {
    const statusIcon = getState().search.statusIconType;

    if (statusIcon === 'search') {
      dispatch(setInputClassFade());
      dispatch(toggleInput());
      await delay(750);
      dispatch(showCloseIcon());
    }
    if (statusIcon === 'close') {
      dispatch(setValue(''));
      dispatch(setSelect(false));
      dispatch(setInputClassFadeOut());
      await delay(800);
      dispatch(toggleInput());
      dispatch(showSearchIcon());
    }
  }
);

export const close = createAsyncThunk(
  'search/close',
  async (_, { dispatch, getState }) => {
    const statusIcon = getState().search.statusIconType;

    if (statusIcon === 'close') {
      dispatch(setValue(''));
      dispatch(setSelect(false));
      dispatch(setInputClassFadeOut());
      await delay(800);
      dispatch(toggleInput());
      dispatch(showSearchIcon());
    }
  }
);

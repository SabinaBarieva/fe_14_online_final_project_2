import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const resnonse = await fetch('/api/products/80465')

      if (!resnonse.ok) {
        throw new Error('!ServerError!')
      }
      const data = await resnonse.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const initialState = {
  product: [],
  status: null,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers:{
    [getProduct.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getProduct.fulfilled]: (state, action) => {
      state.status = 'ready'
      state.product = [action.payload]
    },
    [getProduct.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  }
});

export const {
  setProduct
} = productSlice.actions

export default productSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import testSlice from './slices/testSlice.js'

const store = configureStore({
  reducer: {
    test: testSlice
  }
})

export default store

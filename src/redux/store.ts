import { configureStore } from '@reduxjs/toolkit'
import formFieldReducer from '../redux/formFieldSlice'

const store = configureStore({
  reducer: {
    formFieldReducer,
  },
})

export default store

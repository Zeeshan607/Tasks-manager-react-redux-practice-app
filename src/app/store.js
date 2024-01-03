import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import todoReducer from '../features/todoSlice'
import responseReducer from '../features/responseSlice'
// import filtersReducer from '../features/filters/filtersSlice'
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo:todoReducer,
    response:responseReducer,
  },
  middleware: [thunk],
})
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../store/redux/users/userSlice';

export default configureStore({
  reducer: {
    user:userReducer,
  }
})


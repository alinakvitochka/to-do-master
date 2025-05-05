import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/taskReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
  },
});

export default store;
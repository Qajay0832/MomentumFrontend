import rootReducer from './redux/reducers';
import { configureStore } from '@reduxjs/toolkit'; 

const store = configureStore({
  reducer: {
    data: rootReducer,
  },
});

export default store;

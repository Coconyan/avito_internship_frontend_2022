import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
// import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
    // }).concat(redirect),
});

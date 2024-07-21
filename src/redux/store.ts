import { configureStore } from '@reduxjs/toolkit';
import { userAPI } from './api/userAPI';
import { productAPI } from './api/productAPI';
import { userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';
import { orderApi } from './api/orderAPI';
import { dashboardApi } from './api/dashboard';
export  const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]:userReducer.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    [dashboardApi.reducerPath]:dashboardApi.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [cartReducer.name]:cartReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderApi.middleware,
      dashboardApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;



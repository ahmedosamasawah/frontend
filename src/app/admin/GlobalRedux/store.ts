import { configureStore } from "@reduxjs/toolkit";
import { advicesApi } from "../features/advicesApi";
import { dashboardAuthApi } from "../features/dashboarAuthApi";
import { filesApi } from "../features/filesApi";
import { advicesCategoryesApi } from "../features/advicesCategoryesApi";
import { expensesApi } from "../features/expensesApi";
import { expensetypesApi } from "../features/expensetypesApi";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    [advicesApi.reducerPath]: advicesApi.reducer,
    [dashboardAuthApi.reducerPath]: dashboardAuthApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [advicesCategoryesApi.reducerPath]: advicesCategoryesApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
    [expensetypesApi.reducerPath]: expensetypesApi.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(advicesApi.middleware)
      .concat(dashboardAuthApi.middleware)
      .concat(advicesCategoryesApi.middleware)
      .concat(expensesApi.middleware)
      .concat(expensetypesApi.middleware)
      .concat(filesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import employeeDetail from "../features/employeeDetailSlice";

export const store = configureStore({
  reducer: {
    app: employeeDetail,
  },
});
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  nationalId: string;
  userType: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface Credentials {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Credentials>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearCredentials: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

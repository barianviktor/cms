import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

export interface AuthState {
  user: any;
  loading: boolean;
  error: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: "",
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      state.user = action.payload;
      state.loading = false;
      state.authenticated = true;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      state.authenticated = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.authenticated = false;
    },
    clearError(state) {
      state.error = "";
      state.authenticated = false;
    },
  },
});

export const { setUser, setLoading, setError, clearError } = authSlice.actions;

export const signUp =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(userCredential.user));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

export const loginWithEmailAndPassword =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(userCredential.user));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

export const signOut = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  try {
    await auth.signOut();
    dispatch(setUser(null));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const reducer = authSlice.reducer;

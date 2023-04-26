import { createSlice } from "@reduxjs/toolkit";
import { Language } from "../../interfaces/Language";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

export interface AppState {
  theme: string;
  language: string;
  languages: Language[];
}

const initialState: AppState = {
  theme: "system",
  language: "en-US",
  languages: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },

    setLanguage(state, action) {
      state.language = action.payload;
    },
    setLanguages(state, action) {
      state.languages = action.payload;
    },
  },
});

export const getLanguages = () => async (dispatch: any) => {
  try {
    const languageCollection = collection(db, "languages");
    const data = await getDocs(languageCollection);
    const filteredData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setLanguages(filteredData));
  } catch (error) {
    console.log(error);
  }
};

export const reducer = appSlice.reducer;

export const { setTheme, setLanguage, setLanguages } = appSlice.actions;

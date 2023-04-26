/* import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { signIn, signUp, setUser, signOut } from "./store/slices/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";

export default function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {}, [console.log("mounted")]);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      signOut();
    }
  });
  const onLogin = async () => {
    console.log("login");
    await signIn("test2@test.com", "test123");
  };
  const onLogout = async () => {
    console.log("logout");
    await signOut();
  };
  return (
    <div>
      {authState.authenticated ? (
        <div>Logged in {authState.user}</div>
      ) : (
        <div>Not logged in</div>
      )}
      <button onClick={onLogin}>Login</button>
      <button onClick={onLogout}>Logout</button>
      App
    </div>
  );
}
 */

import Routes from "./Routes";
import Navigation from "./core/navigation/navigation";
import "./App.scss";
import "./assets/slideTransitions.scss";
import { useEffect } from "react";
import { Language } from "./interfaces/Language";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase/firebase-config";
import { useDispatch } from "react-redux";
import { getLanguages } from "./store/slices/app";
import { AppDispatch } from "./store";

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  /* const languages: Language[] = [
    { name: "Magyar", code: "hu", country: "Hungary" },
    { name: "English (US)", code: "en-US", country: "United States" },
    { name: "English (UK)", code: "en-UK", country: "United Kingdom" },
    { name: "Svenska", code: "sv", country: "Sweden" },
    { name: "Español", code: "es", country: "Spain" },
    { name: "Français", code: "fr", country: "France" },
    { name: "Deutsch", code: "de", country: "Germany" },
    { name: "Italiano", code: "it", country: "Italy" },
    { name: "Português", code: "pt", country: "Portugal" },
    { name: "Nederlands", code: "nl", country: "Netherlands" },
    { name: "Русский", code: "ru", country: "Russia" },
    { name: "العربية", code: "ar", country: "Saudi Arabia" },
    { name: "中文", code: "zh", country: "China" },
    { name: "日本語", code: "ja", country: "Japan" },
    { name: "한국어", code: "ko", country: "South Korea" },
    { name: "Türkçe", code: "tr", country: "Turkey" },
    { name: "Suomi", code: "fi", country: "Finland" },
    { name: "Dansk", code: "da", country: "Denmark" },
    { name: "Norsk", code: "no", country: "Norway" },
  ]; */

  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  /*   const addLanguages = () => {
    try {
      const languageCollection = collection(db, "languages");

      languages.forEach((language: Language) => {
        addDoc(languageCollection, {
          name: language.name,
          code: language.code,
          country: language.country,
        }).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }; */
  return (
    <>
      <Navigation />
      <Routes />;
    </>
  );
};

export default App;

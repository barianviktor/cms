/* import React, { useEffect, VFC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/screens/Login/Login";
import { LandingPage } from "./components/screens/LandingPage/LandingPage";
import { ErrorsPage } from "./components/screens/LandingPage/ErrorsPage";
import { useDispatch } from "react-redux";
import { useSelector } from "./store";
import { isUserAuthenticatedSelector } from "./selectors/auth";
import firebase from "firebase";
import { login, logout } from "./slices/auth";
import { Loading } from "./components/screens/Login/Loading";

export const Routes: VFC = () => {
  const authenticated = useSelector(isUserAuthenticatedSelector);
  const dispatch = useDispatch();

  const refresh = React.useCallback(
    async (displayName, email) => {
      const userData = {
        displayName,
        email,
      };
      return dispatch(login(userData));
    },
    [dispatch]
  );

  useEffect(() => {
    const f = async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user && !authenticated) {
          return await refresh(user.displayName, user.email);
        }
        if (!user && !authenticated) {
          dispatch(logout());
        }
      });
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    };
    f();
  });

  if (authenticated === undefined) {
    // "unconfirmed" authentication status
    return <Loading />;
  } else {
    // login user Router
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/landingpage" component={LandingPage} />
          <Route component={ErrorsPage} />
        </Switch>
      </Router>
    );
  }
};
 */

import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase/firebase-config";
import { AppDispatch } from "./store";
import {
  isUserAuthenticatedSelector,
  errorSelector,
} from "./store/selectors/auth";
import {
  setUser,
  loginWithEmailAndPassword,
  signUp,
  signOut,
} from "./store/slices/auth";
import Loading from "./shared/loading/loading";
import { LoadingTypes } from "./interfaces/LoadingTypes";
import AddRestaurant from "./pages/Restaurant/Add/add-restaurant";

export default function Routes() {
  const authenticated = useSelector(isUserAuthenticatedSelector);
  const error = useSelector(errorSelector);

  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = React.useState("test3@test.com");
  const [password, setPassword] = React.useState("test123");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        dispatch(setUser(user));
      } else {
        // User is signed out.
      }
    });

    return () => unsubscribe();
  }, []);
  const onLogin = async () => {
    console.log("login");
    dispatch(loginWithEmailAndPassword(email, password));

    //dispatch(logou(userData));
  };
  const onLogout = async () => {
    console.log("logout");
    dispatch(signOut());
  };
  const onSignUp = async () => {
    console.log("signup");
    dispatch(signUp(email, password));
  };
  return (
    <div>
      <div>
        <h1>login</h1>
        {error ? <div>{error}</div> : <div>no error</div>}
        {authenticated ? <div>Logged in</div> : <div>Not logged in</div>}
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onLogin}>Login</button>
        <button onClick={onLogout}>logout</button>
        <button onClick={onSignUp}>signup</button>
      </div>
      <AddRestaurant />
    </div>
  );
}

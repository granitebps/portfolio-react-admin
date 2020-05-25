import React, { createContext, useReducer, useEffect, useContext } from "react";
import {
  authReducer,
  authInitialState,
  LOGIN,
  LOGOUT,
} from "../reducers/AuthReducer";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const authState = localStorage.getItem("user");
    if (authState) {
      dispatch({
        type: LOGIN,
        payload: {
          user: JSON.parse(authState),
        },
      });
    } else {
      dispatch({
        type: LOGOUT,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

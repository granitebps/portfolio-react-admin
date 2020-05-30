import React, { createContext, useReducer, useEffect, useContext } from "react";
import Cookies from "js-cookie";
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
    const authState = Cookies.get("token");
    const authName = Cookies.get("name");
    if (authState) {
      dispatch({
        type: LOGIN,
        payload: {
          user: {
            name: authName,
          },
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

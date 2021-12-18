import React, { createContext, useReducer, useContext } from "react";

import {
  authReducer,
  authInitialState,
  LOGOUT,
  LOGIN,
} from "../reducers/AuthReducer";
import baseAxios from "../utility/baseAxios";
import { history } from "../history";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const initialAuth = async () => {
    try {
      const authToken = localStorage.getItem("token-gbps");
      if (authToken) {
        const { data } = await baseAxios.get("auth/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        dispatch({
          type: LOGIN,
          payload: {
            user: {
              name: data.data.name,
              avatar: data.data.profile.avatar,
            },
          },
        });
      } else {
        logout();
      }
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  const login = async (username, password, remember_me) => {
    const request = {
      username,
      password,
      remember_me,
    };
    const { data } = await baseAxios.post("auth/login", request);

    localStorage.setItem("token-gbps", data.data.token);
    dispatch({
      type: LOGIN,
      payload: {
        user: {
          name: data.data.name,
          avatar: data.data.avatar,
        },
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("token-gbps");
    dispatch({
      type: LOGOUT,
    });
    history.push("/");
  };

  const forgot = async (email) => {
    const request = {
      email,
    };
    await baseAxios.post("auth/request_reset_password", request);
  };

  return (
    <AuthContext.Provider
      value={{ state, dispatch, logout, initialAuth, login, forgot }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

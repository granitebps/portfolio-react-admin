import React, { createContext, useReducer, useContext } from 'react';
import Cookies from 'js-cookie';

import { authReducer, authInitialState, LOGOUT, LOGIN } from '../reducers/AuthReducer';
import baseAxios from '../utility/baseAxios';
import { history } from '../history';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const initialAuth = async () => {
    try {
      const authToken = Cookies.get('token');
      if (authToken) {
        const { data } = await baseAxios.get('auth/me', {
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
      logout();
    }
  };

  const login = async (username, password) => {
    const request = {
      username,
      password,
    };
    const { data } = await baseAxios.post('auth/login', request);

    const cookiesExpires = new Date(new Date().getTime() + 60 * 60 * 1000);
    const cookiesConfig =
      process.env.NODE_ENV === 'development'
        ? { expires: cookiesExpires }
        : { secure: true, domain: 'granitebps.com', sameSite: 'lax', expires: cookiesExpires };

    Cookies.set('token', data.data.token, cookiesConfig);
    const cookiesToken = Cookies.get('token');
    if (!cookiesToken) {
      return;
    }
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
    const cookiesConfig =
      process.env.NODE_ENV === 'development' ? {} : { domain: 'granitebps.com' };
    Cookies.remove('token', cookiesConfig);
    dispatch({
      type: LOGOUT,
    });
    history.push('/');
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, logout, initialAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

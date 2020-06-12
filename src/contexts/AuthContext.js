import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";
import Cookies from "js-cookie";
import {
  authReducer,
  authInitialState,
  LOGOUT,
  LOGIN,
} from "../reducers/AuthReducer";
import baseAxios from "../utility/baseAxios";
import Spinner from "../components/@vuexy/spinner/Fallback-spinner";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const authToken = Cookies.get("token");
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
          dispatch({
            type: LOGOUT,
          });
        }
      } catch (error) {
        const cookiesConfig =
          process.env.NODE_ENV === "development"
            ? {}
            : { domain: "granitebps.com" };
        Cookies.remove("token", cookiesConfig);
        dispatch({
          type: LOGOUT,
        });
      }
      setLoading(false);
    };
    getAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {loading ? <Spinner color="primary" /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

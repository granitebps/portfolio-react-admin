import Cookies from "js-cookie";
import { LOGOUT } from "../reducers/AuthReducer";
import { history } from "../history";

export const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const removeEmptyStrings = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== "") {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

export const notAuthenticated = (dispatch) => {
  Cookies.remove("token");
  dispatch({
    type: LOGOUT,
  });
  history.push("/");
};

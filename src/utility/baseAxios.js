import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "content-tpe": "application/json",
    Accept: "application/json",
  },
});

export default baseAxios;

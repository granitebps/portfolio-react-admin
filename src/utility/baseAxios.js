import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-tpe': 'application/json',
    Accept: 'application/json',
  },
});

export const useAxios = makeUseAxios({
  axios: baseAxios,
});

export default baseAxios;

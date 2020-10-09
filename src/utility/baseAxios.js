import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const baseAxios = axios.create({
  // baseURL: 'https://api.granitebps.com/api/v1',
  baseURL: 'http://localhost:8000/api/v1',
  // baseURL: 'http://34.101.144.18/api/v1',
  headers: {
    'content-tpe': 'application/json',
    Accept: 'application/json',
  },
});

export const useAxios = makeUseAxios({
  axios: baseAxios,
});

export default baseAxios;

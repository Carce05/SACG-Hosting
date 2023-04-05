import axios from 'axios';

export const mainEndpoint = axios.create({
  baseURL: 'https://sacg-test.onrender.com/api/',
});
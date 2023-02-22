import axios from 'axios';

export const mainEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/',
});
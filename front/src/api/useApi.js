import axios from 'axios';

let api

export function createApi() {
  api = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}`,
  });
  return api;
}

export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}

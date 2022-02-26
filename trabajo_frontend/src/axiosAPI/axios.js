const axios = require("axios");

const BASE_URL = "http://localhost:5000";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivado = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

import axios from "axios";
import { getAccessToken, setAuthorizationToken } from "./session";

const api_error_code = {
  unauthorized: 401,
  accessDenied: 430,
  sessionExpired: 423,
  validationError: 400,
  emailNotVerified: 403,
};

const environment = "dev";
const $axios = axios.create({
  baseURL: 'http://122.176.139.248:8088/api',
  //baseURL: 'https://localhost:44319/api',
  
  headers: {
    "Content-Type": "*/*",
    "Access-Control-Allow-Origin": "*",
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  },
});
const $axios1 = axios.create({
  responseType: "blob",
  baseURL: ``,
  timeout: 30000,
  headers: {
    deviceType: "3",
    offset: "5:30",
    api_key: `1234`,
    "Access-Control-Allow-Origin": "*",
  },
});
$axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
$axios1.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const baseUrlForVideo =
  "https://videorenderservice.amma.social/remotionLibrary/renderVideo";
const $axiosVideo = axios.create({
  // baseURL: `https://infiniteview${environment}microservice.appskeeper.in/remotionLibrary/renderVideo`,
  baseURL: baseUrlForVideo,
  timeout: 90000,
  headers: {
    Authorization: "Basic cmNjOnJjY0AxMjM=",
    api_key: "1234",
    device_type: "3",
    offset: 21,
    device_id: `${Date.now()}`,
    device_token: "win1234",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const tableNames={
  Languages:"Languages",
  FormInstructions:"FormInstructions",
  Pages:"Pages"
}

const OrderDirection={
  Down:"Down",
  Up:"Up"
}

const constants = {
  api_error_code,
  axios: $axios,
  axios1: $axios1,
  getAccessToken,
  setAuthorizationToken,
  tableNames,
  OrderDirection,
  apiUrl: ``,
};
export default constants;

export const imageUrl = ``;

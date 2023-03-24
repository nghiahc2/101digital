import axios from "axios";
import { getLocalStorageItem } from ".";

export const axiosInstance = axios.create({
  baseURL: "https://sandbox.101digital.io/",
});

export const _setupInterceptors = (navigate: any, setUser: any) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${getLocalStorageItem(
        "access-token"
      )}`;
      const orgToken = getLocalStorageItem("org-token");
      if (orgToken) {
        config.headers["org-token"] = `${orgToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // Response interceptor for API calls
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        setUser(null);
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

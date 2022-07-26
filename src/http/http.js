import axios from "axios";
import router from "../router/index";

const instance = axios.create({
  baseURL: "http://192.168.0.12:4000",
  timeout: 5000,
  withCredentials: true
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (401 === error.response.status) {
      router.push("/400");
      return Promise.resolve(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;

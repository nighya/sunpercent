import axios from "axios";
import router from "../router/index";

const instance = axios.create({
  baseURL: "https://sunpercent.com/",
  timeout: 5000,
  withCredentials: true
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (401 === error.response.status) {
      router.push("/404");
      return Promise.resolve(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;

import axios from "axios";

const instance = axios.create({
  // baseURL:ProcessingInstruction.env
  timeout: 5000,
});
instance.defaults.headers.common.Authorization = `bearer ${localStorage.getItem(
  "Authorization"
)}`;
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
instance.defaults.timeout = 0;

export default instance;

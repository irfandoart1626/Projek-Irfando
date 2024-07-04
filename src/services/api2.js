import axios from "axios";

const api2 = axios.create({
  baseURL: "http://localhost:5000",
});

export default api2;

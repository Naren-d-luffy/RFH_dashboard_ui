import axios from "axios";


// Instance for Login
const loginInstance = axios.create({
  baseURL: "https://relience-server.azurewebsites.net/api/",
});

// Instance for Other Requests
const Instance = axios.create({
  baseURL: "http://20.211.48.243:9000/api/v1/",
  // baseURL:"http://4.186.24.50:9000/api/v1"

});

Instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Instance for LocalHost
// const Instance = axios.create({
//   baseURL: "http://localhost:9000/api/v1/",
// });

export { loginInstance, Instance };

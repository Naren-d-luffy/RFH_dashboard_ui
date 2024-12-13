import axios from "axios";


// Instance for Login
const loginInstance = axios.create({
  baseURL: "https://relience-server.azurewebsites.net/api/",
});

// Instance for Other Requests
const Instance = axios.create({
  baseURL: "https://relience-test-backend.onrender.com/api/v1/",
});

// Instance for LocalHost
// const Instance = axios.create({
//   baseURL: "http://localhost:9000/api/v1/",
// });

export { loginInstance, Instance };

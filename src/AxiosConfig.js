import axios from "axios";

const Instance = axios.create({
  // baseURL: "https://relience-server.azurewebsites.net/api/",
    baseURL:"https://relience-test-backend.onrender.com/api/v1/",
});

export default Instance;

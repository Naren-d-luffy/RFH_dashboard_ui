import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Instance } from "./AxiosConfig";
import { showErrorMessage } from "./globalConstant";

const useTokenCheck = () => {
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.log("No refresh token found. Skipping refresh.");
        return;
      }

      const response = await Instance.post("/admin/refresh-token", {
        refreshToken,
      });

      if (response.status === 200) {
        const newAccessToken = response.data.accessToken;
        const decodedAccessToken = jwtDecode(newAccessToken);
        const newExpirationTime = decodedAccessToken.exp * 1000;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("accessTokenExpiration", newExpirationTime);
      } else {
        showErrorMessage("Failed to refresh access token");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      showErrorMessage("Error refreshing access token");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const expirationTime = localStorage.getItem("accessTokenExpiration");
      const currentTime = new Date().getTime();

      if (expirationTime && currentTime >= expirationTime - 60000) {
        refreshAccessToken();
      } 
    }, 30000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};

export default useTokenCheck;

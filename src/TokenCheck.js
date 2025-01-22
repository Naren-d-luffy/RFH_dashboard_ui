import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Instance } from "./AxiosConfig";
import { showErrorMessage } from "./globalConstant";

const useTokenCheck = () => {
  const refreshAccessToken = async () => {
    try {
      console.log("Refreshing access token...");
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

        console.log("New Access Token Decoded:", decodedAccessToken);
        console.log("New Access Token Expiration Time:", new Date(newExpirationTime));

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("accessTokenExpiration", newExpirationTime);

        console.log("Access token refreshed successfully");
      } else {
        console.log("Failed to refresh access token:", response.data);
        showErrorMessage("Failed to refresh access token");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      showErrorMessage("Error refreshing access token");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Checking token expiration...");
      const expirationTime = localStorage.getItem("accessTokenExpiration");
      const currentTime = new Date().getTime();

      if (expirationTime && currentTime >= expirationTime - 60000) {
        console.log("Access token is about to expire. Refreshing...");
        refreshAccessToken();
      } else {
        console.log("Access token is still valid.");
      }
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};

export default useTokenCheck;

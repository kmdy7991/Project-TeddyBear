import axios from "axios";

const accessToken = localStorage.getItem("access_token");
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 403) {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      try {
        const { data } = await axios({
          method: "post",
          url: `/members/reissue`,
          data: { accessToken, refreshToken },
        });
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        originalRequest.headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };
        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("REFRESH_TOKEN", newRefreshToken);
        return await axios(originalRequest);
      } catch (err) {
        console.error(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from "axios";

const accessToken = localStorage.getItem("access_token");

// 북마크 영상 조회 api
export const getBookMarkedVideoList = async (userId: number) => {
  try {
    const response = await axios.get(
      `/api/video-service/bookmarkVideo/${userId}`,
      {
        headers: {
          // 여기에 headers를 포함시킵니다.
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("북마크 영상 조회 실패", err);
  }
};

// 맞춤형 추천 영상 조회 api
export const getTastedVideoList = async (userId: number) => {
  try {
    const response = await axios.get(
      `/api/video-service/videos/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("맞춤형 추천 영상 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("맞춤형 추천 영상 조회 실패", error);
  }
};

// 시청완료 영상 조회 api
export const getWatchedVideoList = async (userId: number) => {
  try {
    const response = await axios.get(`/api/video-service/watch/${userId}`, {
      params: {
        videoWatched: true,
      },
      headers: {
        // 여기에 headers를 포함시킵니다.
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("시청완료 영상 조회 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("시청완료 영상 조회 실패", error);
  }
};

// 시청중인 영상 조회 api
export const getWatchingVideoList = async (userId: number) => {
  try {
    const response = await axios.get(`/api/video-service/watch/${userId}`, {
      params: {
        videoWatched: false,
      },
      headers: {
        // 여기에 headers를 포함시킵니다.
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("시청중인 영상 조회 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("시청중인 영상 조회 실패", error);
  }
};

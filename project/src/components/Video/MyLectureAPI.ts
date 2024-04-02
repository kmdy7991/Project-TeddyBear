import axios from "axios";
// 북마크 영상 조회 api
export const getBookMarkedVideoList = async (userId: number) => {
  try {
    const response = await axios.get(`/video-service/bookmarkVideo/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("북마크 영상 조회 실패", err);
  }
};

// 시청완료 영상 조회 api
export const getWatchedVideoList = async (userId: number) => {
  try {
    const response = await axios.get(`/video-service/watch/${userId}`, {
      params: {
        videoWatched: true,
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
    const response = await axios.get(`/video-service/watch/${userId}`, {
      params: {
        videoWatched: false,
      },
    });
    console.log("시청중인 영상 조회 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("시청중인 영상 조회 실패", error);
  }
};

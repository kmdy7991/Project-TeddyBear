import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VideoResultProps } from "../../pages/Main/VideoList/Video";
import axios from "axios";
// 더미 유저 데이터 테스트
const userId = 2;
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
//

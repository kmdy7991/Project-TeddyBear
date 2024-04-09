import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";

export const GetUserTier = async (userId: number) => {
  const accessToken = localStorage.getItem("access_token");
  console.log("티어 조회를 위한 유저 아이디:", userId);
  try {
    const response = await axios.get(`/api/user-service/tier/${userId}`, {
      headers: {
        // 여기에 headers를 포함시킵니다.
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("유저 티어 조회 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("티어 조회 실패", error);
  }
};

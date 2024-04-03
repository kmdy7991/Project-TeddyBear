import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

function Loading() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const response = axios.get(`/api/user-service/fetchId`);
    console.log(response);
    response
      .then((axiosResponse) => {
        const id = axiosResponse.data.id; // id
        console.log(axiosResponse.data.id);
        const accessToken = axiosResponse.data.accessToken; // accessToken
        // 로컬에 저장
        localStorage.setItem("access_token", accessToken);
        const nickname = axios.get(`/api/user-service/checkNickname/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("nickname");
        console.log(nickname);
        dispatch(
          userActions.loginUser({
            userId: id,
          })
        );
        nickname
          .then((axiosResponse) => {
            console.log("닉네임");
            console.log(axiosResponse.data);
            if (axiosResponse.data) {
              const TierData = axios.get(`/api/user-service/checkTier/${id}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              });
              TierData.then((axiosResponse) => {
                console.log("티어");
                console.log(axiosResponse.data);
                if (axiosResponse.data) {
                  navigate(`/`);
                } else {
                  navigate(`/testguide`);
                }
              }).catch((error) => {
                console.error(error); // 오류 처리
              });
            } else {
              navigate(`/profil`);
            }
          })
          .catch((error) => {
            console.error(error); // 오류 처리
          });
      })
      .catch((error) => {
        console.error(error); // 오류 처리
      });
  }, []);

  return <h1>로딩페이지</h1>;
}

export default Loading;

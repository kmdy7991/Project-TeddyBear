import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const response = axios.get(`/user-service/fetchId`);
    response
      .then((axiosResponse) => {
        const id = axiosResponse.data.id; // id
        const accessToken = axiosResponse.data.accessToken; // accessToken
        const nicknameData = axios.get(`/user-service/checkNickname/${id}`);
        nicknameData
          .then((axiosResponse) => {
            console.log("닉네임");
            console.log(axiosResponse.data);
            if (axiosResponse.data) {
              const TierData = axios.get(`/user-service/checkTier/${id}`);
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

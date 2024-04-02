import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

function Loading() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("오키");
    const response = axios.get(`/user-service/fetchId`);
    response
      .then((axiosResponse) => {
        const id = axiosResponse.data.id; // id
        const accessToken = axiosResponse.data.accessToken; // accessToken
        // 로컬에 저장
        localStorage.setItem("access_token", accessToken);
        const nickname = axios.get(`/user-service/checkNickname/${id}`);
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

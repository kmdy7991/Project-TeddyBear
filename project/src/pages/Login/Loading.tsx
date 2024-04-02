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
        const id = axiosResponse.data; // 데이터
        const nickname = axios.get(`/user-service/checkNickname/${id}`);
        console.log("nickname");
        console.log(nickname);
        nickname
          .then((axiosResponse) => {
            console.log("닉네임");
            console.log(axiosResponse.data);
            dispatch(
              userActions.loginUser({
                userId: id,
              })
            );
            if (axiosResponse.data) {
              const response = axios.get(`/user-service/checkTier/${id}`);
              response
                .then((axiosResponse) => {
                  console.log("티어");
                  console.log(axiosResponse.data);
                  if (axiosResponse.data) {
                    navigate(`/`);
                  } else {
                    navigate(`/cefrtest`);
                  }
                })
                .catch((error) => {
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

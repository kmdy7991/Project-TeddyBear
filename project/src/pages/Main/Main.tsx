import Nav from "../../components/Nav/Nav";
import VideoList from "./VideoList/VideoList";
import styles from "./Main.module.css";
import TodayVoca from "./TodayVoca/TodayVoca";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { userActions } from "../../store/user";
import { useEffect, useState } from "react";
import axios from "axios";
function Main() {
  const dispatch = useDispatch();
  const [nickname, setNickName] = useState("");
  const [tier, setTier] = useState("");
  const id = useSelector((state: RootState) => state.user.userId);
  console.log(id);
  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(id);
        const response = await axios.get(`/api/user-service/user/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("유저 정보 조회 성공", response.data);
        setNickName(response.data.nickname);
      } catch (error) {
        console.error("유저 정보 조회 실패", error);
      }
    };
    getUser();
  }, [id]);

  dispatch(
    userActions.loginUser({
      userId: id,
      userNickName: nickname,
      userTier: tier,
    })
  );

  return (
    <div className={`${styles.container}`}>
      <Nav />
      <div className={`${styles.mainContent}`}>
        <TodayVoca />
        <VideoList />
      </div>
    </div>
  );
}

export default Main;

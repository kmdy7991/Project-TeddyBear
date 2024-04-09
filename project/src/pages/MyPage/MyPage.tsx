import { MouseEvent, useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import styles from "./MyPage.module.css";
import Statistics from "./Statstics/Statstics";
import MyLecture from "./MyLecture/MyLecture";
import MyNote from "./MyNote/MyNote";
import { useNavigate } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { loadingActions } from "../../store/loading";
import { userActions } from "../../store/user";
import { GetUserTier } from "../../components/User/UserTier";
import { TierImage } from "../../components/User/UserTierImage";

type tab = "myLecture" | "myNote";

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<tab>("myLecture");

  const [tier, setTier] = useState("");
  const [level, setLevel] = useState(0);
  const [tierExp, setTierExp] = useState(0);
  const [levelExp, setLevelExp] = useState(0);

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading["PROFILE"]);
  const nickname = useSelector((state: RootState) => state.user.userNickName);
  const id = useSelector((state: RootState) => state.user.userId);
  const handleClickTab = (tab: tab) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveTab(tab);
    navigate(`${tab}`);
  };

  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchTier = async () => {
      try {
        dispatch(loadingActions.startLoading("PROFILE"));
        const tiers = await GetUserTier(id);
        console.log("유저 티어 조회 성공", tiers);
        setTier(tiers.tierName);
        setLevel(tiers.level);
        setTierExp(tiers.tierExp);
        setLevelExp(tiers.levelExp);
      } catch (error) {
        console.error("유저 티어 조회 실패", error);
      } finally {
        dispatch(loadingActions.finishLoading("PROFILE"));
      }
    };

    fetchTier();
  }, []);

  function renderPage() {
    switch (activeTab) {
      case "myLecture":
        return <MyLecture />;
      case "myNote":
        return <MyNote />;
      default:
        return <MyLecture />;
    }
  }

  const tiers: string[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  let userTier: number = 0;

  for (let i = 0; i < tiers.length; i++) {
    if (tiers[i] === tier) {
      userTier = i;
    }
  }

  const maxTierExp = (userTier + 1) * 250 + 250;

  console.log("티어 : " + tier);
  console.log("티어 경험치 통 : " + maxTierExp);

  const maxLevelExp = level * 50 + 50;

  console.log("레벨 : " + level);
  console.log("레벨 경험치 통 : " + maxLevelExp);

  const handleLogout = async () => {
    try {
      // api 주소 고쳐야 함
      const tiers = await axios.get(`/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("로그아웃 성공", tiers);
      window.alert("로그아웃이 완료되었습니다");
      navigate("/landing");
      dispatch(userActions.logoutUser());
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  const handleQuit = async () => {
    try {
      const tiers = await axios.delete(`/api/user-service/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("회원탈퇴 성공", tiers.data);
      window.alert("탈퇴가 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원탈퇴 실패", error);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <Nav />
      <div className={`${styles.main}`}>
        <div className={`${styles.profile}`}>
          <div className={`${styles.tn}`}>
            <div className={`${styles.tierL}`}>
              <TierImage tier={tier} />
              <div className={`${styles.tierContainer}`}>
                <div className={`${styles.tierName}`}>{tier}</div>
              </div>
            </div>
            <div className={`${styles.nickname}`}>{nickname}</div>
          </div>
          <div className={`${styles.exps}`}>
            <div className={`${styles.tier}`}>
              <div className={`${styles.tierS}`}>
                <TierImage tier={tier} />
              </div>
              <div className={`${styles.exp}`}>경험치 퍼센트</div>
            </div>
            <div className={`${styles.tier}`}>
              <div className={`${styles.level}`}>
                <span>Lv.{level}</span>
              </div>
              <div className={`${styles.exp}`}>경험치 퍼센트</div>
            </div>
          </div>
          <div className={`${styles.setting}`}>
            <div>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
            <div>
              <button onClick={handleQuit}>회원탈퇴</button>
            </div>
          </div>
        </div>
        <div className={`${styles.page}`}>
          <div className={`${styles.tab}`}>
            {/* <button
              className={
                activeTab === "statistics"
                  ? `${styles.tabButton} ${styles.tabButtonActive}`
                  : styles.tabButton
              }
              onClick={handleClickTab("statistics")}
            >
              학습 통계
            </button> */}
            <button
              className={
                activeTab === "myLecture"
                  ? `${styles.tabButton} ${styles.tabButtonActive}`
                  : styles.tabButton
              }
              onClick={handleClickTab("myLecture")}
            >
              내 강의
            </button>
            <button
              className={
                activeTab === "myNote"
                  ? `${styles.tabButton} ${styles.tabButtonActive}`
                  : styles.tabButton
              }
              onClick={handleClickTab("myNote")}
            >
              내 강의노트
            </button>
          </div>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={activeTab}
              addEndListener={(node, done) =>
                node.addEventListener("transitionend", done, false)
              }
              classNames="fade"
              timeout={300}
            >
              <div className={`${styles.render}`}>{renderPage()}</div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  );
}

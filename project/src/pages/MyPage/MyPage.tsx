import { MouseEvent, useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import styles from "./MyPage.module.css";
import Statistics from "./Statstics/Statstics";
import MyLecture from "./MyLecture/MyLecture";
import MyNote from "./MyNote/MyNote";
import gold from "../../assets/testTier.png";
import { useNavigate } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { loadingActions } from "../../store/loading";

type tab = "statistics" | "myLecture" | "myNote";

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<tab>("statistics");

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
        const response = await axios.get(`/user-service/tier/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("유저 티어 조회 성공", response.data);
        setTier(response.data.tierName.initialLevel);
        setLevel(response.data.level);
        setTierExp(response.data.tierExp);
        setLevelExp(response.data.levelExp);
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
      case "statistics":
        return <Statistics />;
      case "myLecture":
        return <MyLecture />;
      case "myNote":
        return <MyNote />;
      default:
        return <Statistics />;
    }
  }

  return (
    <div className={`${styles.container}`}>
      <Nav />
      <div className={`${styles.main}`}>
        <div className={`${styles.profile}`}>
          <div className={`${styles.tn}`}>
            <div className={`${styles.tierL}`}>
              <img src={gold} alt="테스트 티어 이미지" />
              <div className={`${styles.tierName}`}>{tier}</div>
            </div>
            <div className={`${styles.nickname}`}>{nickname}</div>
          </div>
          <div className={`${styles.exps}`}>
            <div className={`${styles.tier}`}>
              <div className={`${styles.tierS}`}>티어 이미지</div>
              <div className={`${styles.exp}`}>경험치 퍼센트</div>
            </div>
            <div className={`${styles.tier}`}>
              <div className={`${styles.level}`}>레벨 이미지</div>
              <div className={`${styles.exp}`}>경험치 퍼센트</div>
            </div>
          </div>
          <div className={`${styles.setting}`}>
            <button>프로필 수정하기</button>
          </div>
        </div>
        <div className={`${styles.page}`}>
          <div className={`${styles.tab}`}>
            <button
              className={
                activeTab === "statistics"
                  ? `${styles.tabButton} ${styles.tabButtonActive}`
                  : styles.tabButton
              }
              onClick={handleClickTab("statistics")}
            >
              학습 통계
            </button>
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

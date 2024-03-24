import Nav from "../../components/Nav/Nav";
import VideoList from "./VideoList/VideoList";
import styles from "./Main.module.css";
import TodayVoca from "./TodayVoca/TodayVoca";
function Main() {
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

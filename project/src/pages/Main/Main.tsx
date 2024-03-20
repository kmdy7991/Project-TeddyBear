import Nav from "../../components/Nav/Nav";
import styles from "./Main.module.css";
function Main() {
  return (
    <div className={`${styles.container}`}>
      <Nav />
      <div className={`${styles.mainContent}`}>홈</div>
    </div>
  );
}

export default Main;

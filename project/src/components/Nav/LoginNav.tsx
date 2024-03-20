import { Link } from "react-router-dom";
import styles from "./LoginNav.module.css";

function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  console.log("확인용");
}
function LoginNav() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.navLogin}`} onClick={handleClick}>
        <Link to="/login">로그인</Link>
      </div>
    </div>
  );
}

export default LoginNav;

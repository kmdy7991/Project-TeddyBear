import voca from "../../assets/단어장.png";
import profile from "../../assets/gg_profile.png";
import search from "../../assets/Search.png";
import templogo from "../../assets/임시로고-removebg-preview.png";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

// interface NavProps {
//   className?: string;
// }

function Nav() {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.logo}>
        <Link to="/">
          <img className={styles.logoicon} src={templogo} alt="임시로고" />
        </Link>
      </div>
      <div className={styles.icons}>
        <div className={`${styles.div_icon}`}>
          <Link to="/search">
            <img className={styles.icon} src={search} alt="검색창" />
          </Link>
        </div>
        <div className={`${styles.div_icon}`}>
          <Link to="/vocalist">
            <img className={styles.icon} src={voca} alt="단어장" />
          </Link>
        </div>
        <div className={`${styles.div_icon}`}>
          <Link to="/mypage">
            <img className={styles.icon} src={profile} alt="프로필" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;

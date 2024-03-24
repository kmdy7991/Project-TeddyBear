import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import styles from "./LandingPage.module.css";
import Page1 from "./FirstPage";
import Page2 from "./SecPage";
import Page3 from "./ThirdPage";
import Page4 from "./FourthPage";
import LoginNav from "../../components/Nav/LoginNav";
function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div className={`${styles.scrollContainer}`}>
      <LoginNav />
      <div className={`${styles.mainContent}`}>
        <Page1 />
      </div>
      <div className={`${styles.mainContent}`}>
        <Page2 />
      </div>
      <div className={`${styles.mainContent}`}>
        <Page3 />
      </div>
      <div className={`${styles.mainContent}`}>
        <Page4 />
      </div>
    </div>
  );
}

export default LandingPage;

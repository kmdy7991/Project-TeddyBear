import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import styles from "./LandingPage.module.css";
import Page1 from "./firstPage";
import Page2 from "./secPage";
import Page3 from "./thirdPage";
import Page4 from "./fourthPage";
import LoginNav from "../../components/Nav/LoginNav";
function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div>
      <LoginNav />
      <div className={`${styles.mainContent}`}>
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
      </div>
    </div>
  );
}

export default LandingPage;

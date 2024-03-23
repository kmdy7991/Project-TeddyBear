import styles from "./TodayVoca.module.css";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import VocaCarousel from "./VocaCarousel";
function TodayVoca(): JSX.Element {
  // flip을 카드로 봐야함 카드 캐러셀 만들어

  return (
    <div>
      <div className={`${styles.title}`}>오늘의 영단어</div>
      <VocaCarousel />
    </div>
  );
}

export default TodayVoca;

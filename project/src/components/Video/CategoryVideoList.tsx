import { useParams } from "react-router-dom";
import CategoryDummy from "./CategoryDummy";
import styles from "./CategoryVideoList.module.css";
export default function CategoryVideoList() {
  let { categoryId } = useParams<{ categoryId?: string }>();
  // id에 해당하는 애 찾아서 목록 띄우기
  // api 연결 시키면 이 방법 말고 다르게 불러와야할듯
  const categoryData = CategoryDummy.find(
    (category) => String(category.categoryId) === categoryId
  );

  const categoryIdx: number = categoryId ? parseInt(categoryId, 10) - 1 : 0;
  const categoryColors = [
    "#FF99CF",
    "#3392FF",
    "#D67BE5",
    "#00C299",
    "#FFD155",
    "#02AF70",
    "#FDC699",
    "#FFDA03",
  ];
  const gradientStyle = {
    background: `linear-gradient(${categoryColors[categoryIdx]}, #402544)`,
  };

  // 카테고리 데이터를 사용한 렌더링 로직
  return (
    <div className={`${styles.container}`} style={gradientStyle}>
      <div className={`${styles.title}`}>{categoryData?.category}</div>
      <div className={`${styles.videolist}`}>
        {categoryData?.videos.map((video) => (
          <div className={`${styles.video}`}>
            <div className={`${styles.videoImg}`}>
              <img src={video.thumbnailUrl} alt="썸네일 이미지" />
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

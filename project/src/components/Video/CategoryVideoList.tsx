import { useParams } from "react-router-dom";
import Categories from "./Category";
import styles from "./CategoryVideoList.module.css";
import Nav from "../Nav/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
import { RootState } from "../../store";
import { loadingActions } from "../../store/loading";
export default function CategoryVideoList() {
  let { categoryName } = useParams<{ categoryName?: string }>();
  const [videoList, setVideoList] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.loading["CATEGORY-LIST"]
  );

  const categoryIdx: number = categoryName ? parseInt(categoryName, 10) - 1 : 0;
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

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        dispatch(loadingActions.startLoading("CATEGORY-LIST"));
        const response = await axios.get(
          `/api/category-service/category/${categoryName}`
        );
        setVideoList(response.data);
        console.log(
          `${categoryName} 카테고리 비디오 리스트 조회 성공`,
          response.data
        );
      } catch (error) {
        console.error("카테고리 비디오 리스트 조회 실패", error);
      } finally {
        dispatch(loadingActions.finishLoading("CATEGORY-LIST"));
      }
    };
    fetchVideoList();
  }, [categoryName]);

  // 카테고리 데이터를 사용한 렌더링 로직
  return (
    <div className={`${styles.container}`} style={gradientStyle}>
      <Nav />
      <div className={`${styles.category}`}>{categoryName}</div>
      <div className={`${styles.videolist}`}>
        {/* {categoryData?.videos.map((video) => (
          <div className={`${styles.video}`}>
            <div className={`${styles.videoImg}`}>
              <img src={video.thumbnailUrl} alt="썸네일 이미지" />
            </div>
            <div className={`${styles.text}`}>
              <div className={`${styles.dh}`}>
                <div
                  className={`${styles.dif}`}
                  style={{ backgroundColor: `${categoryColors[categoryIdx]}` }}
                >
                  {video.difficulty}
                </div>
              </div>
              <div className={`${styles.title}`}>{video.title}</div>
              <div className={`${styles.description}`}>{video.description}</div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

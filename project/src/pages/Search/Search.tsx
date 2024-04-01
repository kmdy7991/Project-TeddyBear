import { ChangeEvent, MouseEvent, useState } from "react";
import Nav from "../../components/Nav/Nav";
import styles from "./Search.module.css";
import SearchInput from "./SearchInput";
import CategoryDummy from "../../components/Video/CategoryDummy";
import CategoryBox from "../../components/Video/CategoryBox";
import { useNavigate } from "react-router-dom";
import { VideoResultProps } from "../Main/VideoList/Video";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<VideoResultProps[]>([]); // 검색 결과 상태 추가

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;
    console.log(nextValue);
    setSearchValue(nextValue);
  }

  return (
    <div className={`${styles.container}`}>
      <Nav />
      <div className={`${styles.mainContent}`}>
        <SearchInput
          value={searchValue}
          onChange={handleChange}
          onSearch={setSearchResults}
        />
        {searchValue.length > 0 ? (
          <div className={`${styles.videolist}`}>
            {searchResults?.map((result, index) => (
              <div
                className={`${styles.video}`}
                onClick={() => navigate(`/video/${result.id}`)}
              >
                <div className={`${styles.videoImg}`}>
                  <img src={result.videoThumbnail} alt="썸네일 이미지" />
                </div>
                <div className={`${styles.text}`}>
                  <div className={`${styles.dt}`}>
                    <div className={`${styles.dif}`}>{result.videoGrade}</div>
                    <div className={`${styles.title}`}>{result.videoTitle}</div>
                  </div>
                  <div className={`${styles.description}`}>
                    {result.videoDiscription}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`${styles.category}`}>
            <h2 className={`${styles.title}`}>모두 둘러보기</h2>
            <div className={`${styles.categoryBox}`}>
              {CategoryDummy.map((categoryData, index) => (
                <CategoryBox data={categoryData} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

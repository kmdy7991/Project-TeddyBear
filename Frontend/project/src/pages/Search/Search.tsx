import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import styles from "./Search.module.css";
import SearchInput from "./SearchInput";
import Categories from "../../components/Video/Category";
import CategoryBox from "../../components/Video/CategoryBox";
import { useNavigate } from "react-router-dom";
import { VideoResultProps } from "../Main/VideoList/Video";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loading from "../../components/Loading";
import { PageNextArrow, PagePrevArrow } from "../../components/Slider/Arrow";
import Slider from "react-slick";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<VideoResultProps[] | null>(
    null
  ); // 검색 결과 상태 추가
  const [searchAttempted, setSearchAttempted] = useState(false);
  // 검색 결과 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]); // 페이지 번호 상태 추가
  // 각 페이지 당 비디오 10개씩
  const videosPerPage = 10;
  // 로딩 상태 처리
  const loading = useSelector((state: RootState) => state.loading["SEARCH"]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;
    console.log(nextValue);
    setSearchValue(nextValue);
  }

  // 페이지네이션을 위한 슬라이더
  let scriptSlider = {
    dots: false,
    infinite: false,
    slidesToShow: 10,
    slidesToScroll: 10,
    speed: 500,
    nextArrow: <PageNextArrow />,
    prevArrow: <PagePrevArrow />,
  };

  // 검색 결과와 현재 페이지에 따라 표시할 검색 결과 분할
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = searchResults
    ? searchResults.slice(indexOfFirstVideo, indexOfLastVideo)
    : [];

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    // 검색 결과가 변경될 때 페이지 번호 업데이트
    if (searchResults) {
      const pageCount = Math.ceil(searchResults.length / videosPerPage);
      const newPageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
      setPageNumbers(newPageNumbers);
    }
  }, [searchResults, videosPerPage]);

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.mainContent}>
        <SearchInput
          value={searchValue}
          onChange={handleChange}
          onSearch={setSearchResults}
          onSearchAttempted={() => setSearchAttempted(true)} // 검색 시도됨
        />

        {loading && <Loading />}
        {searchValue.length > 0 && searchAttempted && (
          <>
            {searchResults && searchResults.length > 0 ? (
              <>
                <div className={styles.videolist}>
                  {currentVideos.map((result, index) => (
                    <div
                      key={index}
                      className={styles.video}
                      onClick={() => navigate(`/video/${result.id}`)}
                    >
                      <div className={styles.videoImg}>
                        <img src={result.videoThumbnail} alt="썸네일 이미지" />
                      </div>
                      <div className={styles.text}>
                        <div className={styles.dt}>
                          <div className={styles.dif}>{result.videoGrade}</div>
                          <div className={styles.title}>
                            {result.videoTitle}
                          </div>
                        </div>
                        <div className={styles.description}>
                          {result.videoDiscription}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {searchResults.length > 10 && (
                  <div className={`${styles.pagination}`}>
                    <Slider {...scriptSlider}>
                      {pageNumbers.map((number) => (
                        <div key={number} className={styles.pageIdx}>
                          <button onClick={() => setCurrentPage(number)}>
                            {number}
                          </button>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noContent}>검색 결과가 없습니다.</div>
            )}
          </>
        )}

        {searchValue.length === 0 && (
          <div className={styles.category}>
            <h2 className={styles.title}>모두 둘러보기</h2>
            <div className={styles.categoryBox}>
              {Categories.map((categoryData, index) => (
                <CategoryBox key={index} data={categoryData} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

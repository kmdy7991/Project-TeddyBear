import { ChangeEvent, useState } from "react";
import Nav from "../../components/Nav/Nav";
import styles from "./Search.module.css";
import SearchInput from "./SearchInput";
import CategoryDummy from "../../components/Video/CategoryDummy";
import CategoryBox from "../../components/Video/CategoryBox";
function Search() {
  const [searchValue, setSearchValue] = useState("");
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;
    console.log(nextValue);
    setSearchValue(nextValue);
  }
  return (
    <div className={`${styles.container}`}>
      <Nav />
      <div className={`${styles.mainContent}`}>
        <SearchInput value={searchValue} onChange={handleChange} />
        <div className={`${styles.category}`}>
          <h2 className={`${styles.title}`}>모두 둘러보기</h2>
          <div className={`${styles.categoryBox}`}>
            {CategoryDummy.map((categoryData, index) => (
              <CategoryBox data={categoryData} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./SearchInput.module.css";
import search from "../../assets/inputsearch.png";
import axios from "axios";
interface SearchInputProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (results: any[]) => void; // 검색 결과를 설정하는 함수 타입 추가
}

export default function SearchInput({
  value = "",
  onChange,
  onSearch,
}: SearchInputProps) {
  const handleSearchClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/video-service/videos/${encodeURIComponent(value)}`
      );
      console.log(response);
      onSearch(response.data); // 검색 결과를 상위 컴포넌트에 전달
    } catch (err) {
      console.error("Search request failed", err);
    }
  };
  return (
    <div className={`${styles.inputContainer}`}>
      <input
        className={`${styles.Input}`}
        value={value}
        onChange={onChange}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearchClick}>
        <img src={search} alt="검색창" />
      </button>
    </div>
  );
}

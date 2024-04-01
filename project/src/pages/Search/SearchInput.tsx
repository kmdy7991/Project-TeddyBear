import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./SearchInput.module.css";
import search from "../../assets/inputsearch.png";
import axios from "axios";
import { VideoResultProps } from "../Main/VideoList/Video";
interface SearchInputProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (results: VideoResultProps[]) => void; // 검색 결과를 설정하는 함수 타입 추가
  // SearchInput.tsx의 props 인터페이스에 추가
  onSearchAttempted: () => void;
}

export default function SearchInput({
  value = "",
  onChange,
  onSearch,
  onSearchAttempted,
}: SearchInputProps) {
  const handleSearchClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearchAttempted(); // 검색 시도됨
    try {
      const response = await axios.get(
        `/video-service/videos/${encodeURIComponent(value)}`
      );
      console.log(response);
      // 검색 결과가 있으면 그 결과를 사용하고, 없으면 null로 설정
      onSearch(response.data !== "" ? response.data : null);
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

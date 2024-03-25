import { ChangeEvent, MouseEvent } from "react";
import styles from "./SearchInput.module.css";
import search from "../../assets/inputsearch.png";
interface SearchInputProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  value = "",
  onChange,
}: SearchInputProps) {
  function handleSearchClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(value);
  }
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

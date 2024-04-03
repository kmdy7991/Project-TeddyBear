import { Category } from "./Category";
import Categories from "./Category";
import styles from "./CategoryBox.module.css";
import culture from "../../assets/CategoryTeddy/culture.png";
import economy from "../../assets/CategoryTeddy/economy.png";
import politics from "../../assets/CategoryTeddy/politics.png";
import society from "../../assets/CategoryTeddy/society.png";
import sport from "../../assets/CategoryTeddy/sport.png";
import it from "../../assets/CategoryTeddy/it.png";
import global from "../../assets/CategoryTeddy/global.png";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
interface CategoryProps {
  data: Category;
}

export default function CategoryBox({ data }: CategoryProps) {
  const navigate = useNavigate();
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    navigate(`/category/${data.category}`);
  }
  const categoryName = data.category;
  // 카테고리명에 따라 카드에 맞는 이미지 배치하기 위한 switch문
  function matchBox(categoryName: string) {
    switch (categoryName) {
      case "사회":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#FF99CF" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img style={{ width: "12rem" }} src={society} alt="사회곰" />
          </div>
        );
        break;
      case "정치":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#50A1FD" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={politics} alt="정치곰" />
          </div>
        );
        break;
      case "경제":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#D67BE5" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={economy} alt="경제곰" />
          </div>
        );
        break;
      case "생활문화":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#00C299" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={culture} alt="문화곰" />
          </div>
        );
        break;
      case "IT과학":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#FFD155" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={it} alt="코딩곰" />
          </div>
        );
        break;
      case "스포츠":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#02AF70" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img style={{ width: "10rem" }} src={sport} alt="운동곰" />
          </div>
        );
        break;
      case "세계":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#FDC699" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={global} alt="세계곰" />
          </div>
        );
        break;
      // case "연예":
      //   return (
      //     <div
      //       className={`${styles.container}`}
      //       style={{ backgroundColor: "#FFDA03" }}
      //       onClick={handleClick}
      //     >
      //       <span className={`${styles.title}`}>{data.category}</span>
      //       <img src={entertainment} alt="엔터테인먼트곰" />
      //     </div>
      //   );
      //   break;
      default:
        return null;
    }
  }
  return matchBox(categoryName);
}

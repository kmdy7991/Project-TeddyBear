import CategoryDummy from "./CategoryDummy";
import { Category } from "./Category";
import styles from "./CategoryBox.module.css";
import art from "../../assets/CategoryTeddy/art.png";
import science from "../../assets/CategoryTeddy/science.png";
import economy from "../../assets/CategoryTeddy/economy.png";
import politics from "../../assets/CategoryTeddy/politics.png";
import nature from "../../assets/CategoryTeddy/nature.png";
import education from "../../assets/CategoryTeddy/education.png";
import sport from "../../assets/CategoryTeddy/sport.png";
import entertainment from "../../assets/CategoryTeddy/entertainment.png";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
interface CategoryProps {
  data: Category;
}

export default function CategoryBox({ data }: CategoryProps) {
  const navigate = useNavigate();
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    navigate(`/category/${data.categoryId}`);
  }
  const categoryName = data.category;
  // 카테고리명에 따라 카드에 맞는 이미지 배치하기 위한 switch문
  function matchBox(categoryName: string) {
    switch (categoryName) {
      case "교육":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#FF99CF" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img style={{ width: "10rem" }} src={education} alt="교육곰" />
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
      case "과학":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#00C299" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={science} alt="과학곰" />
          </div>
        );
        break;
      case "아트":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#FFD155" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={art} alt="예술곰" />
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
      case "자연":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#FDC699" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={nature} alt="자연곰" />
          </div>
        );
        break;
      case "엔터테인먼트":
        return (
          <div
            className={`${styles.container}`}
            style={{ backgroundColor: "#FFDA03" }}
            onClick={handleClick}
          >
            <span className={`${styles.title}`}>{data.category}</span>
            <img src={entertainment} alt="엔터테인먼트곰" />
          </div>
        );
        break;
      default:
        return null;
    }
  }
  return matchBox(categoryName);
}

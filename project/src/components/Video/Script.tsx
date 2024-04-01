import axios from "axios";
import { PageNextArrow, PagePrevArrow } from "../Slider/Arrow";
import { useState } from "react";
interface ScriptProps {
  videoId?: string;
}
export default function Script({ videoId }: ScriptProps) {
  // ----페이지네이션을 위한 요소들---
  // 현재 페이지 번호 추적
  const [currentPage, setCurrentPage] = useState(1);
  const [scriptIdx, setScriptIdx] = useState(0);
  const [selectedScriptIdx, setSelectedScriptIdx] = useState<number | null>(
    null
  );

  // 비디오id에 해당하는 스크립트 불러오기
  const [videoScript, setVideoScript] = useState([]);

  // 페이지네이션을 위한 슬라이더
  let scriptSlider = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    nextArrow: <PageNextArrow />,
    prevArrow: <PagePrevArrow />,
  };
  // 각 페이지 당 스크립트 25줄 넣는 게 적당한듯
  const itemsPerPage = 25;

  // 현재 페이지에 해당하는 스크립트 줄을 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // slice 메서드 활용해서 현재 페이지의 첫번째~마지막 줄 가져오기
  // const currentItems = dummy.video_transcript.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

  //   // 전체 페이지 수 계산
  //   // const pageCount = Math.ceil(dummy.video_transcript.length / itemsPerPage);
  //   const pageNumbers = [];
  //   for (let i = 1; i <= pageCount; i++) {
  //     pageNumbers.push(i);
  //   }
  //   // 페이지 변경하는 함수
  //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //   const handleScriptClick = (index: number) => {
  //     setSelectedScriptIdx(index);
  //   };
  // const getScript = async () => {
  //   try {
  //     const response = await axios.get(`/script-service/script/${videoId}`);
  //     console.log("스크립트 조회 성공", response.data);
  //   } catch (error) {
  //     console.error("스크립트 조회 실패", error);
  //   }
  // };

  return;
}

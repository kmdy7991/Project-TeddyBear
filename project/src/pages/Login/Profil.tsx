import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./profil.module.css";
import templogo from "../../assets/임시로고-removebg-preview.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { userActions } from "../../store/user";

function Profil() {
  const [nickname, setnickname] = useState("");
  const [year, setYear] = useState(""); // 년도
  const [month, setMonth] = useState(""); // 월
  const [day, setDay] = useState(""); // 일
  const [gender, setGender] = useState("");
  const [isFormvalid, setisFormvalid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(true); // 닉네임 유효성 상태
  const [isGenderValid, setIsGenderValid] = useState(true); // 성별 유효성 상태
  const navigate = useNavigate();

  const id = useSelector((state: RootState) => state.user.userId);
  console.log(id);
  const accessToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    // 입력값이 변경될 때마다 유효성을 검사
    setIsNicknameValid(nickname.trim().length > 0); // 닉네임 유효성 검사
    // setIsAgeValid(Age !== ""); // 나이 유효성 검사
    setIsGenderValid(gender !== ""); // 성별 유효성 검사
  }, [nickname, gender]);

  useEffect(() => {
    // 모든 유효성이 만족할 때만 전체 폼 유효성을 설정
    setisFormvalid(
      isNicknameValid &&
        year !== "" &&
        month !== "" &&
        day !== "" &&
        isGenderValid
    );
  }, [isNicknameValid, year, month, day, isGenderValid]);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
      setnickname(e.target.value);
    }
  };

  const onChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleSubmit = async () => {
    if (isFormvalid) {
      const birthday = `${year}${month}${day}`; // 생년월일을 문자열로 합침
      try {
        const response = await axios.put(
          `/api/user-service/update/${id}`,
          {
            nickname: nickname,
            birthday: birthday,
            gender: gender,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        dispatch(userActions.loginUser({ userId: id, userNickName: nickname }));
        navigate("/testguide"); // 성공적으로 데이터를 저장한 후 페이지 이동
      } catch (error) {
        console.error("데이터 저장 중 에러 발생:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <div>
          <img className={styles.logo} src={templogo} alt="임시로고" />
          <div className={styles.inputbox}>
            <input
              type="text"
              value={nickname}
              onChange={onChangeNickname}
              placeholder={"닉네임"}
              className={styles.inputboxsize}
            />
          </div>

          <div className={styles.inputbox}>
            {/* 생년월일 입력칸 */}
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={styles.yearbox}
            >
              <option value="">YYYY</option>
              {Array.from({ length: 100 }, (_, index) => (
                <option key={index} value={new Date().getFullYear() - index}>
                  {new Date().getFullYear() - index}년
                </option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={styles.monthbox}
            >
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, index) => (
                <option
                  key={index + 1}
                  value={(index + 1).toString().padStart(2, "0")}
                >
                  {index + 1}월
                </option>
              ))}
            </select>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={styles.daybox}
            >
              <option value="">DD</option>
              {Array.from({ length: 31 }, (_, index) => (
                <option
                  key={index + 1}
                  value={(index + 1).toString().padStart(2, "0")}
                >
                  {index + 1}일
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputbox}>
            <select
              value={gender}
              onChange={onChangeGender}
              className={styles.selectboxsize}
            >
              <option value="">성별을 선택하세요</option>
              <option value="female">여자</option>
              <option value="male">남자</option>
            </select>
          </div>
          <div className={styles.inputbox}>
            <button
              onClick={handleSubmit}
              disabled={!isFormvalid}
              className={styles.button}
            >
              저장
            </button>
          </div>
        </div>
      </div>

      <div className={styles.box2}>
        <h1 className={styles.text1}>잠시만요, </h1>
        <h3 className={styles.text2}>
          여러분의 맞춤 학습을 위한 첫걸음입니다!
        </h3>
        <h3 className={styles.text3}>여러분의 성별과 나이를 알려주세요.</h3>
        <h3 className={styles.text4}>작성하신 프로필을 기반으로 </h3>
        <h3 className={styles.text5}>
          여러분에게 딱 맞는 학습 영상을 추천해 드려요.
        </h3>
      </div>
    </div>
  );
}

export default Profil;

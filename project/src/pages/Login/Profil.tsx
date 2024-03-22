import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './profil.module.css'
import templogo from '../../assets/임시로고-removebg-preview.png'

function Profil() {

  const [nickname, setnickname] = useState("");
  const [Age, setAge] = useState("");
  const [gender, setGender] = useState("")
  const [isFormvalid, setisFormvalid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(true); // 닉네임 유효성 상태
  const [isAgeValid, setIsAgeValid] = useState(true); // 나이 유효성 상태
  const [isGenderValid, setIsGenderValid] = useState(true); // 성별 유효성 상태
  const navigate = useNavigate(); 

  useEffect(() => {
    // 입력값이 변경될 때마다 유효성을 검사
    setIsNicknameValid(nickname.trim().length > 0); // 닉네임 유효성 검사
    setIsAgeValid(Age !== ""); // 나이 유효성 검사
    setIsGenderValid(gender !== ""); // 성별 유효성 검사
  }, [nickname, Age, gender]);

  useEffect(() => {
    // 모든 유효성이 만족할 때만 전체 폼 유효성을 설정
    setisFormvalid(isNicknameValid && isAgeValid && isGenderValid);
  }, [isNicknameValid, isAgeValid, isGenderValid]);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
    setnickname(e.target.value)
    }
  };

  const onChangeAge = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(e.target.value)
  };

  const onChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender (e.target.value)
  };

  const handleSubmit = () => {
    if (isFormvalid) {
      // 유효한 경우에만 저장 처리
      // 여기에 저장 처리하는 코드를 추가
      navigate('/testguide')
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <div>
          <img className={styles.logo} src={templogo} alt="임시로고" />
          <div className={styles.inputbox}>
              <input type="text" value={nickname} onChange={onChangeNickname} placeholder={'닉네임'} className={styles.inputboxsize} />
          </div>
          <div className={styles.inputbox}>
            {/* select 요소를 사용하여 나이를 선택합니다. */}
            <select value={Age} onChange={onChangeAge} className={styles.selectboxsize}>
              <option value="">나이를 선택하세요</option>
                {/* 10살부터 100살까지 option 요소를 생성합니다. */}
                {Array.from({ length: 91 }, (_, index) => (
                  <option key={index + 10} value={index + 10}>{index + 10}살</option>
                ))}
            </select>
          </div>
          <div className={styles.inputbox}>
            <select value={gender} onChange={onChangeGender} className={styles.selectboxsize}>
              <option value="">성별을 선택하세요</option>
              <option value="female">여자</option>
              <option value="male">남자</option>
            </select>
          </div>
          <div className={styles.inputbox}>
            <button onClick={handleSubmit} disabled={!isFormvalid} className={styles.button}>저장</button>
          </div>
   
        </div>
      </div>


      <div className={styles.box2}>
        <h1>잠시만요, </h1>
        <h3>여러분의 맞춤 학습을 위한 첫걸음입니다!</h3>
        <h3>여러분의 성별과 나이를 알려주세요.</h3>
        <h3>작성하신 프로필을 기반으로 </h3>
        <h3>여러분에게 딱 맞는 학습 영상을 추천해 드려요.</h3>
      </div>
    </div>

  );
}

export default Profil;



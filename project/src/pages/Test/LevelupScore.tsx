import React, { useState, useEffect } from 'react';
import styles from '../Login/CefrScore.module.css'

// CefrScore 컴포넌트 정의
const CefrScore: React.FC<{ score: number; onClose: () => void; }> = ({ score, onClose }) => {
  // 상태 변수 선언: 레벨 상태
  const [pass, setPass] = useState<boolean>(false);

  // useEffect 훅을 사용하여 합격 여부 결정
  useEffect(() => {
    // 점수에 따라 합격 여부 결정
    const isPass = score >= 6;
    // 합격 여부 상태 업데이트
    setPass(isPass);
  }, [score]);


  // 합격 여부에 따라 다른 스타일을 적용할 클래스 설정
  const resultClass = pass ? styles.boxinbox : styles.boxinboxfail;

  // 렌더링
  return (
    <div className={styles.box}>
      <div className={`${styles.boxinbox} ${resultClass}`}>
        {/* 합격 여부에 따라 메시지 표시 */}
        <h1 className={styles.inboxtext}>{pass ? 'Level 변경' : '깎이는 경험치'}</h1>
      </div>
      {/* 제목 */}
      <h1 className={styles.text}>{ pass ? '축하합니다!!' : '안타깝지만 승급 조건을 달성하지 못했습니다.'}</h1>
      {/* 결과 메시지 */}
      <h1 className={styles.text}>{ pass ? '티어로 승급하였습니다.' : '학습 후 다시 시도하여 주세요.'}</h1>
    </div>
  );
}

export default CefrScore; // 컴포넌트 내보내기

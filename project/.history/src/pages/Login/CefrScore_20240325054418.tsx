import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ScorePage: React.FC = () => {
  const location = useLocation();
  const { score } = location.state; // 이전 페이지에서 전달된 점수(state)를 받아옵니다.

  return (
    <div>
      <h1>점수 확인</h1>
      <p>당신의 점수는 {score}점 입니다!</p>
      {/* 사용자가 다시 테스트를 시작하거나 홈페이지로 돌아갈 수 있는 링크 제공 */}
      <Link to="/">홈으로 돌아가기</Link>
      <Link to="/cefrtest">테스트 다시하기</Link>
    </div>
  );
};

export default ScorePage;

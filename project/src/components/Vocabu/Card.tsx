// Card.tsx
import React from 'react';
import styles from './Card.module.css';

interface Word {
  id: number;
  eng: string;
  kor: string;
  part: string;
  tier: string; // string으로 변경
}

interface CardProps {
  word: Word;
  deleteWord?: (wordId: number) => void; // Optional
  addWord?: (wordId: number) => void; // Optional
}

const Card: React.FC<CardProps> = ({ word, deleteWord, addWord }) => {
  // tierColors를 Record 형태로 수정하여 어떤 문자열 키에도 대응될 수 있게 합니다.
  const tierColors: Record<string, string> = {
    A1: '#FFCCCC',
    A2: '#FFCC99',
    B1: '#FFFF99',
    B2: '#CCFFCC',
    C1: '#CCFFFF',
    C2: '#CCCCFF',
  };

  // 단어의 티어에 해당하는 배경색 지정
  const backgroundColor = tierColors[word.tier as keyof typeof tierColors] || '#FFFFFF';

  return (
    <div className={styles.card}>
      <div className={styles.cardFront} style={{ backgroundColor }}>
        <h2>{word.eng}</h2>
      </div>
      <div className={styles.cardBack} style={{ backgroundColor }}>
        <div>
          <h2>{word.eng}</h2>
        </div>
        <div>({word.part})</div>
        <div>{word.kor}</div>
        {/* deleteWord와 addWord 함수를 사용하는 버튼 추가 */}
        {deleteWord && <button onClick={() => deleteWord(word.id)}>Delete</button>}
        {addWord && <button onClick={() => addWord(word.id)}>Add</button>}
      </div>
    </div>
  );
};

export default Card;

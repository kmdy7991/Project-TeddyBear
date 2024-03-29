import React, { useState } from 'react';

const TextToSpeechComponent: React.FC = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSpeech = async () => {
    const response = await fetch('http://localhost:8000/text-to-speech/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    } else {
      console.error('Text-to-Speech conversion failed');
    }
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={handleSpeech}>play</button>
    </div>
  );
};

export default TextToSpeechComponent;
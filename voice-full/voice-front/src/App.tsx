import React from 'react';
import AudioRecorder from './component/AudioRecorder';
import TextToSpeech from './component/AudioTTS';

function App() {
  return (
    <div className="App">
      <AudioRecorder />
      <TextToSpeech />
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState(null);
  const [activeButton, setActiveButton] = useState(null);


  const handleButtonClick = (newContent) => {
    setContent(newContent);
    setActiveButton(newContent);
  };

  const handleGoToInitialScreen = () => {
    // 화면의 초기 상태로 돌아가는 로직을 구현합니다.
    setContent(null);
    setActiveButton(null);
  };

  return (
    <div className="App">
      <div className="stats-container">
        <h1 className="stats-title">과거 혼잡도 통계</h1>
      </div>
      <button className="initial-screen-button" onClick={handleGoToInitialScreen}>첫 화면</button>
      <div className="buttons">
          <button className={activeButton === "버튼 1에 해당하는 내용" ? "active" : ""} onClick={() => handleButtonClick("버튼 1에 해당하는 내용")}>cctv1</button>
          <button className={activeButton === "버튼 2에 해당하는 내용" ? "active" : ""} onClick={() => handleButtonClick("버튼 2에 해당하는 내용")}>cctv2</button>
          <button className={activeButton === "버튼 3에 해당하는 내용" ? "active" : ""} onClick={() => handleButtonClick("버튼 3에 해당하는 내용")}>cctv3</button>
          <button className={activeButton === "버튼 4에 해당하는 내용" ? "active" : ""} onClick={() => handleButtonClick("버튼 4에 해당하는 내용")}>cctv4</button>
        </div>
        <div className="content">{content}</div>
    </div>
  );
}

export default App;


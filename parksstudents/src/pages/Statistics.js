import React, {useState} from 'react';
import './Statistics.css';
import { useNavigate } from "react-router-dom"; 

import { Routes, Route } from 'react-router-dom';

import { Mainpage } from "./Mainpage";

export function Statistics() {
    const navigate = useNavigate();

    const [content, setContent] = useState(null);
    const [activeButton, setActiveButton] = useState(null);


    const handleButtonClick = (newContent) => {
    setContent(newContent);
    setActiveButton(newContent);
    };

    // 버튼 클릭 시 화면의 메인페이지로 돌아가는 함수
    const handleGoToInitialScreen = () => {
        navigate("/mainpage");
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
            <Routes>
                <Route path="/mainpage" element={<Mainpage />} />
            </Routes>
            
        </div>
  );
}

export default Statistics;

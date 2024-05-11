import './Mainpage.css';
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"; 
import { Routes, Route } from 'react-router-dom';

import { Statistics } from './Statistics';
import { Login } from './Login';

export function Mainpage() {
    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 창의 너비 상태를 추적

    const handleResize = () => {
        setWindowWidth(window.innerWidth); // 창의 너비가 변경될 때마다 상태 업데이트
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize); // 창 크기 변경 이벤트 리스너 추가

        return () => {
            window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
        };
    }, []);

    const handleGoToStatisticsPage = () => {
      navigate("/statistics");
    // 화면의 통계페이지로 돌아가는 로직 구현
    };
    // 버튼 클릭 시 화면의 메인페이지로 돌아가는 함수
    const handleGoToLoginScreen = () => {
      navigate("/login");
    };

  
    return (
    
    <div className="App">
      <header className="App-header">
        <div className="stroke-text">실시간 혼잡도</div>
        <button className="login" onClick={handleGoToLoginScreen}>Login</button>
        <button className="newaccount" onClick={handleGoToLoginScreen}>new account</button>
        <div className="cam"></div>
        <div className="exp">모니터링</div>
        <button className="cctv1">cctv1</button>
        <button className="cctv2">cctv2</button>
        <button className="cctv3">cctv3</button>
        <button className="cctv4">cctv4</button>
        <div className="cnt">군중 수: </div>
        
        <form>
          <div className="report">
          <fieldset style={{ textAlign: 'left'}}>
            <legend style={{fontSize: '25px', fontWeight: 'bold'}}>실시간 리포트 보내기</legend>
            <br/>
            <label>수신인 주소 &nbsp;</label>
            <input type="email" autofocus required />
            <br/>
            <label>
              위치 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input type="text" autofocus required/>
            <br/>
            <label>혼잡도 수준 &nbsp;</label>
            <input type="text" autofocus required/>
            <br/>
            <label>이동 추이  &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" autofocus required/>
            <br/>
            <br/>
            <textarea cols="55" rows="5" placeholder="현재 상태에 이상이 있으니 확인 요망"></textarea>   
          </fieldset>
          </div>
          <div>
            <button type="submit" className="send">send</button>
            <button type="reset" className="res">reset</button>
          </div>
        </form>
        <div className="warn"></div>
        <button className="stat" onClick={handleGoToStatisticsPage}>군중 통계 보기</button>
        <div className="dir">이동 방향 :</div>
      </header>
   
      <Routes unmountOnNavigate>
            <Route path="/login" element={<Login />} />
            <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default Mainpage;


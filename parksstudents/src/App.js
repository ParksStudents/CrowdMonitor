import React from "react";
import { Routes, Route } from 'react-router-dom';

import { Mainpage } from "./pages/Mainpage";
import { Statistics } from "./pages/Statistics";
import { Login } from "./pages/Login";

import "./App.css";

function App() {
  return (
    <div className="App"> 
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/mainpage" element={<Mainpage />} />
        </Routes>    
    </div>
  );
}

export default App;

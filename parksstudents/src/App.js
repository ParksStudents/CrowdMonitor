import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Mainpage } from "./pages/Mainpage";
import { Statistics } from "./pages/Statistics";
import { Login } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/statistics" element={<Statistics />} />
        </Routes>    
    </BrowserRouter>
  );
}

export default App;

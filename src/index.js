import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //ReactDOM.render 함수 첫번째 파라미터를 두번째 파라미터에 렌더링해라!
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
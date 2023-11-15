import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import searchReducer from "./features/Search";
import { BrowserRouter } from 'react-router-dom';
import InPageNavReducer from './features/InPageNav';
import ScrollToTop from './Helpers';
import authentificateReducer from './features/Authentification';
import messageReducer from "./features/Message"
const store=configureStore({
  reducer:{
    searchStore:searchReducer,
    pageNavStore:InPageNavReducer,
    authentificateStore:authentificateReducer,
    messageStore:messageReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>    <BrowserRouter><ScrollToTop /><App /></BrowserRouter>
</Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

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
import InPageNav from './features/InPageNav';
import ScrollToTop from './Helpers';
const store=configureStore({
  reducer:{
    searchStore:searchReducer,
    pageNavStore:InPageNav,

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

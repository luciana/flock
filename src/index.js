import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import Amplify from '@aws-amplify/core';
import './index.css';
import App from './App';
import { AppProvider } from "./Contexts";
import reportWebVitals from './reportWebVitals';
import awsconfig from './aws-exports';
import Firebase from "./Services/firebase";
//https://www.linkedin.com/pulse/part-3-complete-login-flow-using-react-aws-amplify-s3-jos%C3%A9-augusto/?trk=pulse-article_more-articles_related-content-card
//https://github.com/gugazimmermann/amplify-login/blob/v1.7/src/pages/home/Layout.jsx
Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

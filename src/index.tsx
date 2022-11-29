import React from "react";
import ReactDOM from "react-dom";
// import 'antd/dist/antd.css';
import App from "./App";
import GlobalStyle from "./theme";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./index.scss";
import "./styles/output.css";
import "resize-observer-polyfill/dist/ResizeObserver.global";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

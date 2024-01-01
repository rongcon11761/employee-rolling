import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./assets/styles/index.css";
import "./assets/styles/App.scss";
import { Provider } from "react-redux";
import middleware from "./middleware";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App/App";
import { reducer } from "./reducers/reducer";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

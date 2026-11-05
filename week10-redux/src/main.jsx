import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
// One provider, right at the top. Every component inside of it can reach the store
// at any depth
  <Provider store={store}>
    <App />
  </Provider>,
);

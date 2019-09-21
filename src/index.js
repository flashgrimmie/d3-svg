import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "material-components-web/dist/material-components-web.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}

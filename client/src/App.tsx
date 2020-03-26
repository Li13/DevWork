import React from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import store from "./store";
import routes from "./router";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </Provider>
  );
}

export default App;

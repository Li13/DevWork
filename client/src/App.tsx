import React from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import store from "./store";
import routes, { history } from "./router";
import { Router } from "react-router";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>{renderRoutes(routes)}</Router>
    </Provider>
  );
}

export default App;

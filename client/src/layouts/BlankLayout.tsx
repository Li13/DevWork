import React from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import Header from "./Header";

const Layout = ({ route }: RouteConfig) => (
  <div>
    <Header />
    {renderRoutes(route.routes)}
  </div>
);

export default Layout;

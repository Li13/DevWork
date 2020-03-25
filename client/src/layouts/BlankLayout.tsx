import React from "react";
import { renderRoutes, RouteConfig } from "react-router-config";

const Layout = ({ route }: RouteConfig) => <>{renderRoutes(route.routes)}</>;

export default Layout;

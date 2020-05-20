import React, { lazy, Suspense, LazyExoticComponent, ComponentType } from "react";
import { createBrowserHistory } from "history";
import BlankLayout from "@/layouts/BlankLayout";

const SuspenseComponent = (Component: LazyExoticComponent<ComponentType>) => (props: any) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

const DemandComponent = lazy(() => import("../pages/demand"));
const Login = lazy(() => import("../pages/login"));

export const history = createBrowserHistory();
export default [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/",
        exact: true,
        component: SuspenseComponent(DemandComponent)
      },
      {
        path: "/login",
        component: SuspenseComponent(Login)
      }
    ]
  }
];

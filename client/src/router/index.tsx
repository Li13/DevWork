import React, { lazy, Suspense, LazyExoticComponent, ComponentType } from "react";
import BlankLayout from "../layouts/BlankLayout";

const SuspenseComponent = (Component: LazyExoticComponent<ComponentType>) => (props: any) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

const DemandComponent = lazy(() => import("../views/demand"));

export default [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/",
        component: SuspenseComponent(DemandComponent)
      }
    ]
  }
];

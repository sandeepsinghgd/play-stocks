import React, { FC } from "react";
import { Route } from "react-router-dom";
import BasePage from "../pages/BasePage";

interface RouteWithSubRoutesProps {
  key?: any;
  exact?: boolean;
  path?: string;
  components?: any;
}

const RouteWithSubRoutes: FC<RouteWithSubRoutesProps> = (props) => {
  return (
    <>
      <Route exact path={`${props.path}`}>
        {props.children}
      </Route>
      {props.components &&
        props.components.length > 0 &&
        props.components.map((routeComponent: any, i: any) => (
          <Route
            exact
            key={routeComponent.key}
            path={`${props.path}${routeComponent.path}`}
          >
            <BasePage pageName={routeComponent.title}>
              {routeComponent.component}
            </BasePage>
          </Route>
        ))}
    </>
  );
};

export default RouteWithSubRoutes;

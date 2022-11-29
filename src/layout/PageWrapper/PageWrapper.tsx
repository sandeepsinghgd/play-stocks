import { FC } from "react";
import { Switch } from "react-router-dom";
import routes from "../../routes";
import BasePage from "../../pages/BasePage";
import RouteWithSubRoutes from "../../routes/routeWithSubRoutes";

const PageWrapper: FC = () => {
  return (
    <div id="page-wrapper">
      <Switch>
        {routes.map((route, i) => {
          return (
            <RouteWithSubRoutes key={i} path={route.path} {...route}>
              <BasePage pageName={route.title}>{route.component}</BasePage>
            </RouteWithSubRoutes>
          );
        })}
      </Switch>
    </div>
  );
};

export default PageWrapper;

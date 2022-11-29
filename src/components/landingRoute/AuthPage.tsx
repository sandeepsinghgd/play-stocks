// import { useEffect, useState } from "react";
import { Redirect, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LogIn from "../../pages/LogIn";
import ForgotPassword from "../../pages/ForgotPassword";
import AuthenticatedRoute from "../authentication/AuthenticatedRoute";
import MainLayout from "../../layout/MainLayout";
// import { useTypedSelector } from "../../hooks/useTypeSelector";
import ResetPassword from "../../pages/ResetPassword";
import ForgotMpin from "../../pages/forgotMpin";

const AuthPage = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const { isUserAuthenticated } = useTypedSelector((state) => state.auth);
  // useEffect(() => {
  //   if (isUserAuthenticated) {
  //     setIsAuthenticated(true);
  //   }
  // }, [isUserAuthenticated]);
  return (
    // <AuthContext.Provider value={isAuthenticated}>
      <BrowserRouter basename="">
        <Switch>
          <AuthenticatedRoute
            exact
            path={"/"}
            onAuthenticated={() => {
              return <Redirect to={"/dashboard"} />;
            }}
            onUnauthenticated={() => {
              return <LogIn />;
            }}
          />
          <AuthenticatedRoute
            exact
            path={"/login"}
            onAuthenticated={() => {
              return <Redirect to={"/dashboard"} />;
            }}
            onUnauthenticated={() => {
              return <LogIn />;
            }}
          />
          <AuthenticatedRoute
            exact
            path={"/forgot-password"}
            onAuthenticated={() => {
              return <Redirect to={"/dashboard"} />;
            }}
            onUnauthenticated={() => {
              return <ForgotPassword />;
            }}
          />
          <AuthenticatedRoute
            exact
            path={"/forgot-mpin/:token"}
            onAuthenticated={() => {
              return <Redirect to={"/dashboard"} />;
            }}
            onUnauthenticated={() => {
              return <ForgotMpin />;
            }}
          />
          <AuthenticatedRoute
            exact
            path={"/reset-password/:token"}
            onAuthenticated={() => {
              return <Redirect to={"/dashboard"} />;
            }}
            onUnauthenticated={() => {
              return <ResetPassword />;
            }}
          />
          <AuthenticatedRoute
            exact
            path={"/dashboard"}
            onAuthenticated={() => {
              return <MainLayout />;
            }}
            onUnauthenticated={() => {
              return <Redirect to={"/"} />;
            }}
          />
          <AuthenticatedRoute
            onAuthenticated={() => {
              return <MainLayout />;
            }}
            onUnauthenticated={() => {
              return <LogIn />;
            }}
          />
        </Switch>
      </BrowserRouter>
    // </AuthContext.Provider>
  );
};
export default AuthPage;

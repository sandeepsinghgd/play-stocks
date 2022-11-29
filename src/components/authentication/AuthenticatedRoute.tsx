import React from "react";
import { Route } from "react-router";
import { useUserAuthentication } from "../../hooks/useUserAuthentication";

interface UserAuthenticationProps {
  exact?: boolean;
  path?: string;
  onInit?: any;
  onAuthenticated?: any;
  onUnauthenticated?: any;
}

const AuthenticatedRoute: React.FunctionComponent<UserAuthenticationProps> = ({
  onAuthenticated,
  onUnauthenticated,
  ...props
}) => {
  const { authenticated } = useUserAuthentication();

  return (
    <Route {...props}>
      {!authenticated && onUnauthenticated()}
      {authenticated && onAuthenticated()}
    </Route>
  );
};

export default AuthenticatedRoute;

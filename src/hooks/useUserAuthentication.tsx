import { useDispatch } from "react-redux";
import { setToken } from "../redux/actions/auth";
import { useTypedSelector } from "./useTypeSelector";

export const useUserAuthentication = () => {
  const authState = useTypedSelector((state) => state.auth);
  const { isUserAuthenticated } = authState;
  const dispatch = useDispatch();
  let authenticated = isUserAuthenticated;

  const token = localStorage.getItem("token");

  if (token) {
    if (!authenticated) {
      authenticated = true;
      dispatch(
        setToken({
          token,
          isUserAuthenticated: authenticated,
        })
      );
    }
  } else {
    if (authenticated) {
      dispatch(
        setToken({
          token: "",
          isUserAuthenticated: false,
        })
      );
    }
    authenticated = false;
  }

  return { authenticated };
};

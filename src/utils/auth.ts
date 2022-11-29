import store from "../redux/store";

function getAuthenticationToken() {
  const state = store.getState();

  return state.auth.token;
}

export { getAuthenticationToken };

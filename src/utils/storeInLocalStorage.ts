import { message } from "antd";

export const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e: any) {
    message.error(e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    return undefined;
  }
};

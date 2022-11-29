// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { ReactSession } from "react-client-session";
export const saveAuth = (token: string) => {
  localStorage.setItem("token", token);
};

export const secretKey = (key: string) => {
  localStorage.setItem("secretKey", key);
};

export const removeAuth = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  // ReactSession.removeItem("token");
  // window.location.href = "/";
};

export const findCommonElements = (arr1: any, arr2: any) => {
  return arr1?.some((item: any) => arr2?.includes(item));
};

export const timeFormat = (time: any) => {
  if (
    (time !== null && time?.includes("T")) ||
    (time !== null && time?.includes(".000000Z"))
  ) {
    const init = time?.replace(/T/g, " | ");
    return init.replace(/.000000Z/g, "");
  } else {
    return "N/A";
  }
};

export const onIdle = () => {
  window.location.href = "/";

  removeAuth();
};
export const onBeforeunload = (e: any) => {
  e.preventDefault();
  if (e.keyCode === 116) {
    // alert("exit page?");
  }
  removeAuth();
};

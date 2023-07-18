import { Cookies } from "react-cookie";

// 쿠키 생성
const cookies = new Cookies();

export const setCookie = (data) => {
  const today = new Date();
  const expireTime = today.setDate(today.getDate() + 7);

  return cookies.set("user", data, {
    sameSite: "strict", // 보안설정
    path: "/", // 쿠키 저장 경로
    expires: expireTime, // 만료시간
    httpOnly: true, // 브라우저 쿠키접근 차단
  });
};
export const getCookie = () => {
  return cookies.get("");
};
export const removeCookie = () => {
  return cookies.remove("user", {
    sameSite: "strict",
    path: "/",
  });
};

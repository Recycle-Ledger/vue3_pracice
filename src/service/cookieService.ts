import Cookies from "js-cookie";

// 쿠키 조회 함수
export function getCookie(cookieName: string): string {
  return Cookies.get(cookieName) || ""; // 쿠키가 없을 경우 ""를 반환
}

// 쿠키 생성 함수
export function setCookie(
  name: string,
  value: string,
  expiresInDays: number = 7
): void {
  Cookies.set(name, value, { expires: expiresInDays }); // 기본적으로 7일 동안 유지되는 쿠키
}

// 쿠키 삭제 함수
export function deleteCookie(name: string): void {
  Cookies.remove(name);
}

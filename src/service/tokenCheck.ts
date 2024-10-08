// services/authService.ts
import router from "../router";
import { logout } from "./loginService";

// 토큰 검증 및 리다이렉트 함수
export async function checkAndRedirectToken(): Promise<string> {
  const token: string = sessionStorage.getItem("recycle-token") || "";
  if (!token) {
    await logout();
    router.replace("/login");
    return "";
  }
  return token;
}

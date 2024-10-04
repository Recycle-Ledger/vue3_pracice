// authService.ts
import Cookies from "js-cookie";
import { useUserStore } from "../stores/userStore";

const apiUrl = import.meta.env.VITE_API_URL;
const webUrl = import.meta.env.VITE_WEB_URL;

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

// 로그인 함수
export async function login(
  emailInput: string | null,
  passwordInput: string | null
): Promise<void> {
  const url = `${apiUrl}/api/v1/auth/login`;
  const lang: string | undefined = Cookies.get("lang");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
      redirect: "follow",
    });

    const result = await response.json();
    const resultCode: string = result.code;

    // 성공
    if (resultCode === "200") {
      // Access token을 sessionStorage에 저장
      sessionStorage.setItem(
        "recycle-token",
        `Bearer ${result.data.accessToken}`
      );

      // Refresh token을 쿠키에 저장
      setCookie("recycle-refresh", result.data.refreshToken);

      // 언어 설정이 없는 경우 기본적으로 'ko' 설정
      if (!lang) {
        setCookie("lang", "ko");
      }

      // 회원 정보 가져오기
      await getMember();
      return;
    }

    // 실패
    if (resultCode === "AUTH_002") {
      alert(
        lang === "ko"
          ? "이메일과 비밀번호가 일치하지 않습니다."
          : "Email and password do not match."
      );
    } else {
      alert(lang === "ko" ? "로그인에 실패하였습니다." : "Login failed.");
    }
    
  } catch (error) {
    console.error(error);
    alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
  }
}

// 로그아웃 함수
export async function logout(): Promise<void> {
  // access token 삭제
  sessionStorage.removeItem("recycle-token");

  // refresh token 삭제
  deleteCookie("recycle-refresh");

  // 나머지 쿠키 삭제
  Cookies.remove("recycle-refresh");
  Cookies.remove("companyId");
  Cookies.remove("companyType");
  Cookies.remove("companyName");
  Cookies.remove("companyNameEn");
  Cookies.remove("memberName");
  Cookies.remove("role");

  // 로그인 페이지로 리다이렉션 -> vue-router로 바꾸기
  location.href = `${webUrl}/login`;
}

// 회원 정보 조회 함수
export async function getMember(): Promise<void> {
  const url = `${apiUrl}/api/v1/auth/info`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: sessionStorage.getItem("recycle-token") || "" },
      redirect: "follow",
    });

    const result = await response.json();

    if (result.code === "200") {
      // 기존 쿠키 삭제 및 새로운 데이터 설정
      Cookies.remove("memberName");
      Cookies.remove("companyId");
      Cookies.remove("companyName");
      Cookies.remove("companyNameEn");
      Cookies.remove("companyType");
      Cookies.remove("role");

      Cookies.set("memberName", result.data.memberName);
      Cookies.set("companyId", result.data.companyId);
      Cookies.set("companyName", result.data.companyName);
      Cookies.set("companyNameEn", result.data.companyEnglishName);
      Cookies.set("companyType", result.data.companyType);
      Cookies.set("role", result.data.role);

      if (result.data.newMember) {
        location.href = `${webUrl}/password/change`;
      } else {
        location.href = `${webUrl}/${result.data}/dashboard`;
      }
    } else if (result.code === "AUTH_002") {
      const refreshed = await refreshToken(getCookie("recycle-refresh"));
      if (refreshed) {
        await getMember();
      } else {
        location.href = `${webUrl}/login`;
      }
    } else if (result.code === "AUTH_005") {
      alert(result.message);
      location.href = `${webUrl}/login`;
    } else {
      console.log(result);
      alert("오류가 발생하였습니다. 잠시후 다시 시도해주세요. (getUserInfo)");
    }
  } catch (error) {
    console.error(error);
  }
}

// 토큰 재발급 함수
export async function refreshToken(token: string | null): Promise<boolean> {
  if (!token) return false;

  const url = `${apiUrl}/api/v1/auth/refresh`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token }),
      redirect: "follow",
    });

    const result = await response.json();

    if (result.code === "200") {
      sessionStorage.setItem("recycle-token", "Bearer " + result.data);
      return true;
    } else {
      location.href = `${webUrl}/login`;
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

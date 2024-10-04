import { getCookie, setCookie, deleteCookie }  from "./cookieService";
import i18n from "../i18n"; // I18n 인스턴스 가져오기

const apiUrl = import.meta.env.VITE_API_URL;


// 로그인 함수
export async function login(emailInput: string, passwordInput: string): Promise<any> {
  const url = `${apiUrl}/api/v1/auth/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    });

    const result = await response.json();
    const resultCode: string = result.code;

    if (resultCode === '200') {
      // Access token을 세션 스토리지에 저장
      sessionStorage.setItem('recycle-token', `Bearer ${result.data.accessToken}`);

      // 로그인 성공 시 사용자 정보를 반환 (Pinia에서 처리)
      return {
        success: true,
        userInfo: {
          memberName: result.data.memberName,
          companyId: result.data.companyId,
          companyName: result.data.companyName,
          companyNameEn: result.data.companyEnglishName,
          companyType: result.data.companyType,
          role: result.data.role,
        },
      };
    } else if (resultCode === 'AUTH_002') {
      alert('이메일과 비밀번호가 일치하지 않습니다.');
      return { success: false };
    } else {
      alert('로그인에 실패하였습니다.');
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    alert('로그인 중 오류가 발생했습니다.');
    return { success: false };
  }
}

// 로그아웃 함수
export async function logout(): Promise<string> {
  // access token 삭제
  sessionStorage.removeItem("recycle-token");
  // refresh token 삭제
  deleteCookie("recycle-refresh");
  return "/login";
}

// 회원 정보 조회 함수
export async function getMember(): Promise<string> {
  const url = `${apiUrl}/api/v1/auth/info`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: sessionStorage.getItem("recycle-token") || "" },
      redirect: "follow",
    });

    const result = await response.json();

    const { t } = i18n.global; // I18n의 글로벌 인스턴스에서 t 함수 가져오기

    if (result.code === "200") {
      // 기존 쿠키 삭제 및 새로운 데이터 설정
      // 쿠키 삭제
      deleteCookie("memberName");
      deleteCookie("companyId");
      deleteCookie("companyName");
      deleteCookie("companyNameEn");
      deleteCookie("companyType");
      deleteCookie("role");

      // 쿠키 설정
      setCookie("memberName", result.data.memberName);
      setCookie("companyId", result.data.companyId);
      setCookie("companyName", result.data.companyName);
      setCookie("companyNameEn", result.data.companyEnglishName);
      setCookie("companyType", result.data.companyType);
      setCookie("role", result.data.role);

      // 새 회원일 경우 비밀번호 변경 페이지로 이동
      if (result.data.newMember) {
        return "/password/change";
      } else {
        return "/dashboard";
      }
    }

    if (result.code === "AUTH_002") {
      const refreshed = await refreshToken(getCookie("recycle-refresh"));
      if (refreshed) {
        return await getMember(); // 토큰이 갱신되면 회원 정보 다시 요청
      }
    } else if (result.code === "AUTH_005") {
      alert(result.message);
    } else {
      console.log(result);
      alert(`${t("loginService.loginFailed")}`);
    }

    return "/login"; // 로그인 페이지로 리다이렉트
  } catch (error) {
    console.error(error);
    return "/login"; // 오류 발생 시 로그인 페이지로 리다이렉트
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
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

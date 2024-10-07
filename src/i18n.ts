import { createI18n } from "vue-i18n";

const messages = {
  en: {
    topBar: {
      help: "Help",
      language: "Language",
      profile: "Profile",
      password: "Password",
      logout: "Logout",
      userType: "Select User Type",
    },
    loginVue: {
      emailPlaceholder: "Please enter your email",
      passwordPlaceholder: "Please enter your password",
      emailRequired: "Please enter your email.",
      passwordRequired: "Please enter your password.",
      loginFailed: "Login failed.",
      authMismatch: "Email and password do not match.",
      loginButton: "Login",
      FindPasswordButton: "Find Password",
    },
    loginService: {
      loginFailed: "Login failed.",
      authMismatch: "Email and password do not match.",
    },
    sidebar: {
      dashboard: "Dashboard",
      members: "Members",
      warehouse: "Warehouse",
      purchaseRequest: "Purchase Request",
      purchaseHistory: "Purchase History",
      inventory: "Inventory",
      salesRequest: "Sales Request",
      salesHistory: "Sales History",
      uco: "UCO",
      tallow: "Tallow",
      localFile: "Local Tallow File",
      localHistory: "Local Tallow History",
      localSales: "Local Tallow Sales",
      certificationRequest: "Certification Request",
      certificationHistory: "Certification History",
      ai: "AI Recognition",
      calendar: "Inventory Calendar",
      statistics: "Statistics",
      fishFat: "Fish Fat",
      ucoDailyStats: "UCO Daily Stats",
    },
  },
  ko: {
    topBar: {
      help: "도움말",
      language: "언어",
      profile: "프로필",
      password: "비밀번호",
      logout: "로그아웃",
      userType: "사용자 유형 선택",
    },
    loginVue: {
      emailPlaceholder: "이메일을 입력하세요",
      passwordPlaceholder: "패스워드를 입력하세요",
      emailRequired: "이메일을 입력해주세요.",
      passwordRequired: "비밀번호를 입력해주세요.",
      loginFailed: "로그인에 실패하였습니다.",
      authMismatch: "이메일과 비밀번호가 일치하지 않습니다.",
      loginButton: "로그인",
      FindPasswordButton: "비밀번호 찾기",
    },
    loginService: {
      loginFailed: "로그인에 실패하였습니다.",
      authMismatch: "이메일과 비밀번호가 일치하지 않습니다.",
    },
    sidebar: {
      dashboard: "대시보드",
      members: "회원 목록",
      warehouse: "창고 목록",
      purchaseRequest: "구매 요청",
      purchaseHistory: "구매 내역",
      inventory: "재고 목록",
      salesRequest: "판매 요청",
      salesHistory: "판매 내역",
      uco: "UCO",
      tallow: "Tallow",
      localFile: "국산우지 파일",
      localHistory: "국산우지 내역",
      localSales: "국산우지 판매",
      certificationRequest: "인증 요청",
      certificationHistory: "인증 내역",
      ai: "AI 인식",
      calendar: "재고 달력",
      statistics: "통계",
      fishFat: "Fish Fat",
      ucoDailyStats: "UCO 일별 통계",
    },
  },
};


const i18n = createI18n({
  legacy: false, // Composition API 사용
  locale: "ko", // 기본 언어
  fallbackLocale: "en", // 번역이 없을 때 백업 언어
  messages,
});

export default i18n;

import { createI18n } from "vue-i18n";

const messages = {
  en: {
    loginVue: {
      emailPlaceholder: 'Please enter your email',
      passwordPlaceholder: 'Please enter your password',
      emailRequired: 'Please enter your email.',
      passwordRequired: 'Please enter your password.',
      loginFailed: 'Login failed.',
      authMismatch: 'Email and password do not match.',
    },
  },
  ko: {
    loginVue: {
      emailPlaceholder: '이메일을 입력하세요',
      passwordPlaceholder: '패스워드를 입력하세요',
      emailRequired: '이메일을 입력해주세요.',
      passwordRequired: '비밀번호를 입력해주세요.',
      loginFailed: '로그인에 실패하였습니다.',
      authMismatch: '이메일과 비밀번호가 일치하지 않습니다.',
    },
  }
};


const i18n = createI18n({
  legacy: false, // Composition API 사용
  locale: "ko", // 기본 언어
  fallbackLocale: "en", // 번역이 없을 때 백업 언어
  messages,
});

export default i18n;

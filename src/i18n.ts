import { createI18n } from "vue-i18n";

// JSON 파일 불러오기
import en from './locales/en.json';
import ko from './locales/ko.json';

// i18n 인스턴스 생성
const i18n = createI18n({
  legacy: false, // Composition API 사용
  locale: "ko", // 기본 언어
  fallbackLocale: "en", // 번역이 없을 때 백업 언어
  messages: {
    en,
    ko,
  },
});

export default i18n;

<template>
  <div
    class="min-w-[500px] max-w-[700px] w-dvw h-dvh mx-auto p-5 flex justify-center"
  >
    <div class="flex flex-col w-10/12 h-full justify-center items-center gap-4">
			<div class="w-10/12 text-end relative">
    <button
      class="w-1/12 max-w-[100px] rounded-md"
      @click="toggleDropdown"
    >
      <img
        :src="currentFlag"
        alt="Language"
        class="rounded-md w-full h-full"
      />
    </button>

    <!-- 드롭다운 메뉴 -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg"
    >
      <button
        class="flex items-center p-2 hover:bg-gray-200 w-full"
        @click="changeLanguage('ko')"
      >
        <img
          src="/assets/flags/kr.svg"
          alt="Korean"
          class="w-6 h-6 mr-2"
        />
        <span>한국어</span>
      </button>
      <button
        class="flex items-center p-2 hover:bg-gray-200 w-full"
        @click="changeLanguage('en')"
      >
        <img
          src="/assets/flags/us.svg"
          alt="English"
          class="w-6 h-6 mr-2"
        />
        <span>English</span>
      </button>
    </div>
  </div>
      <img src="/assets/images/logo1.png" class="object-cover w-10/12" />

      <!-- 이메일 입력 필드 -->
      <div class="w-10/12">
        <input
          type="email"
          v-model="email"
          @input="clearEmailError"
          :class="{ 'outline-red-500': emailError }"
          class="h-12 w-full rounded-md px-4 border border-gray-300"
          :placeholder="t('loginVue.emailPlaceholder')"
          ref="emailInput"
          required
        />
        <p v-if="emailError" class="text-red-500 text-sm">
					{{ emailError }}
				</p>
      </div>

      <!-- 비밀번호 입력 필드 -->
      <div class="w-10/12">
        <input
          type="password"
          v-model="password"
          @input="clearPasswordError"
          :class="{ 'outline-red-500': passwordError }"
          class="h-12 w-full rounded-md px-4 border border-gray-300"
          :placeholder="t('loginVue.passwordPlaceholder')"
          ref="passwordInput"
          required
        />
        <p v-if="passwordError" class="text-red-500 text-sm">
          {{ passwordError }}
        </p>
      </div>

      <button
        class="h-12 w-10/12 rounded-md px-4 bg-[#6DD298] text-white font-bold"
        @click="handleLogin"
      >
        Login
      </button>

      <button
        class="h-12 w-10/12 rounded-md px-4 bg-[#6DD298] text-white font-bold"
      >
        Find Password
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n"; // 다국어 지원을 위한 훅
import { login } from "../service/loginService";

// v-model
const email = ref<string>(""); // 이메일의 타입 문자열
const password = ref<string>(""); // 비밀번호의 타입 문자열

const emailError = ref<string>(""); // 이메일 오류 메시지의 타입 문자열
const passwordError = ref<string>(""); // 비밀번호 오류 메시지의 타입 문자열

// 각 input 요소에 접근하기 위한 ref
const emailInput = ref<HTMLInputElement | null>(null); // 이메일 input 요소의 타입 지정
const passwordInput = ref<HTMLInputElement | null>(null); // 비밀번호 input 요소의 타입 지정

const { t, locale } = useI18n(); // 다국어 텍스트와 언어 설정 훅

// 언어 변경 함수
const switchLanguage = (): void => {
  locale.value = locale.value === "ko" ? "en" : "ko"; // 언어를 한국어/영어로 전환
};

// 오류 메시지 제거 함수 (사용자가 입력할 때 호출)
const clearEmailError = (): void => {
  emailError.value = "";
};

const clearPasswordError = (): void => {
  passwordError.value = "";
};

// 로그인 처리 함수
const handleLogin = async (): Promise<void> => {
  // 이메일 유효성 검사
  if (!email.value) {
    emailError.value = t("loginVue.emailRequired"); // 다국어 메시지 사용
    emailInput.value?.focus(); // 이메일 input 요소에 포커스 설정
    return;
  }

  // 비밀번호 유효성 검사
  if (!password.value) {
    passwordError.value = t("loginVue.passwordRequired"); // 다국어 메시지 사용
    passwordInput.value?.focus(); // 비밀번호 input 요소에 포커스 설정
    return;
  }

  // 유효성 검사가 모두 통과된 경우 로그인 처리
  await login(email.value, password.value); // login 함수 호출
};


// 드롭다운 상태 관리
const isDropdownOpen = ref<boolean>(false);

// 현재 선택된 언어에 따른 깃발 이미지
const currentFlag = ref<string>('/assets/flags/ko.svg');

// 드롭다운 열기/닫기
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 언어 변경 함수
const changeLanguage = (language: string) => {
  locale.value = language;

  // 선택한 언어에 따라 플래그 이미지를 변경
  if (language === 'ko') {
    currentFlag.value = '/assets/flags/ko.svg';
  } else {
    currentFlag.value = '/assets/flags/us.svg';
  }

  // 드롭다운을 닫기
  isDropdownOpen.value = false;
};
</script>

<style scoped></style>

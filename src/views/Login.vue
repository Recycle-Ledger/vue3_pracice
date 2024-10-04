<template>
  <div
    class="min-w-[500px] max-w-[700px] w-dvw h-dvh mx-auto p-5 flex justify-center"
  >
    <div class="flex flex-col w-10/12 h-full justify-center items-center gap-4">
      <div class="w-10/12 text-end relative">
        <!-- LanguageDropDown 컴포넌트 호출 -->
        <LanguageDropDown />
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
        {{ t("loginVue.loginButton") }}
      </button>

      <button
        class="h-12 w-10/12 rounded-md px-4 bg-[#6DD298] text-white font-bold"
      >
        {{ t("loginVue.FindPasswordButton") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n"; // 다국어 지원을 위한 훅
import { login, logout, getMember } from "../service/loginService";
import { useUserStore } from "../stores/userStore";
import LanguageDropDown from "../components/LanguageDropDown.vue"; // LanguageDropDown.vue 컴포넌트 임포트
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

// 컴포넌트가 마운트될 때 로그인 상태를 확인하여 리다이렉트 처리
onMounted(async () => {
  // 로그인 상태 확인
  if (userStore.isLogin) {
    // 로그인된 상태라면 대시보드로 이동
    router.push("/dashboard");
  } else {
    // 로그인되지 않은 상태라면 로그아웃 실행
    userStore.clearUserInfo(); // Pinia 상태 초기화
    router.push("/login");
    await logout();
  }
});

// v-model
const email = ref<string>(""); // 이메일의 타입 문자열
const password = ref<string>(""); // 비밀번호의 타입 문자열

const emailError = ref<string>(""); // 이메일 오류 메시지의 타입 문자열
const passwordError = ref<string>(""); // 비밀번호 오류 메시지의 타입 문자열

// 각 input 요소에 접근하기 위한 ref
const emailInput = ref<HTMLInputElement | null>(null); // 이메일 input 요소의 타입 지정
const passwordInput = ref<HTMLInputElement | null>(null); // 비밀번호 input 요소의 타입 지정

const { t } = useI18n(); // 다국어 텍스트와 언어 설정 훅

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
  const loginResult = await login(email.value, password.value); // login 함수 호출
  if (loginResult) {
    const memberInfo = await getMember(); // 회원 정보 조회
    if (memberInfo.success) {
      // Pinia 상태에 사용자 정보 저장
      userStore.setUserInfo(memberInfo.userInfo);
    }
  } else {
    // 로그인 실패 시 상태 초기화
    userStore.clearUserInfo();
  }
};
</script>

<style scoped></style>

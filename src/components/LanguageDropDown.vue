<template>
  <div class="relative" ref="dropdownContainer">
    <button
      class="w-10 h-8 rounded-md hover:scale-95 flex"
      @click="toggleDropdown"
    >
      <img
        :src="currentFlag"
        alt="Language"
        class="rounded-md w-full h-full shadow-md object-cover justify-center items-center"
      />
    </button>
    <!-- 백드롭 -->
    <div
      v-if="isDropdownOpen"
      class="fixed inset-0 bg-opacity-0 z-20"
      @click="toggleDropdown"
    ></div>
    <!-- 드롭다운 메뉴 -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-0 mt-2 w-32 z-30 bg-white border rounded-md shadow-lg transform transition-all duration-300 ease-out"
      :class="{
        'opacity-100 scale-100': isDropdownOpen,
        'opacity-0 scale-95': !isDropdownOpen,
      }"
    >
      <button
        class="flex items-center p-2 hover:bg-gray-200 w-full"
        @click="changeLanguage('ko')"
      >
        <img
          src="/assets/flags/ko.svg"
          alt="Korean"
          class="w-6 h-6 mr-2 shadow-sm"
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
          class="w-6 h-6 mr-2 shadow-sm"
        />
        <span>English</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n(); // 다국어 설정 훅

// 드롭다운 상태 관리
const isDropdownOpen = ref<boolean>(false);

// 현재 선택된 언어에 따른 깃발 이미지
const currentFlag = computed<string>(() => {
  return locale.value === "ko"
    ? "/assets/flags/ko.svg"
    : "/assets/flags/us.svg";
});

// 드롭다운 열기/닫기
const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 언어 변경 함수
const changeLanguage = (language: string) => {
  locale.value = language;

  // 드롭다운을 닫기
  isDropdownOpen.value = false;
};
</script>

<style scoped></style>

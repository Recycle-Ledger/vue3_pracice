<template>
  <div class="relative" ref="dropdownContainer">
    <button class="w-10 h-8 rounded-md hover:scale-95" @click="toggleDropdown">
      <img
        :src="currentFlag"
        alt="Language"
        class="rounded-md w-full h-full shadow-md object-cover"
      />
    </button>

    <!-- 드롭다운 메뉴 -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg transform transition-all duration-300 ease-out"
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n(); // 다국어 설정 훅

// 드롭다운 상태 관리
const isDropdownOpen = ref<boolean>(false);

// 현재 선택된 언어에 따른 깃발 이미지
const currentFlag = ref<string>("/assets/flags/ko.svg");

// 드롭다운 열기/닫기
const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 언어 변경 함수
const changeLanguage = (language: string) => {
  locale.value = language;

  // 선택한 언어에 따라 플래그 이미지를 변경
  currentFlag.value =
    language === "ko" ? "/assets/flags/ko.svg" : "/assets/flags/us.svg";

  // 드롭다운을 닫기
  isDropdownOpen.value = false;
};

// 전역 클릭 이벤트를 감지하여 드롭다운 외부 클릭 시 닫기
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = dropdownContainer.value;
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false; // 외부 클릭 시 드롭다운 닫기
  }
};

// 드롭다운 컨테이너 참조
const dropdownContainer = ref<HTMLElement | null>(null);

// 컴포넌트가 마운트될 때 전역 클릭 이벤트 추가
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// 컴포넌트가 언마운트될 때 전역 클릭 이벤트 제거
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>

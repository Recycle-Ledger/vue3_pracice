<template>
  <header
    class="bg-white p-4 shadow-md fixed top-0 h-16"
    :style="
      !isSimple
        ? 'left: 256px; width: calc(100% - 256px)'
        : 'left: 80px; width: calc(100% - 80px)'
    "
  >
    <div class="mx-auto flex justify-between items-center">
      <!-- 사이드바 토글 버튼 -->
      <div class="text-lg font-bold cursor-pointer" @click="toggleSidebar">
        =
      </div>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <p>도움말</p>
          </li>
          <li class="max-w-[100px]">
            <LanguageDropDown />
          </li>
          <li class="relative">
            <p class="cursor-pointer" @click="toggleDropdown">
              사용자 유형 선택 {{ !isDropdownOpen ? "▼" : "▲" }}
            </p>
            <ul
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50"
            >
              <!-- 사용자 유형 리스트 -->
              <li
                v-for="(type, index) in userTypes"
                :key="index"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @click="selectUserType(type)"
              >
                {{ type }}
              </li>
              <li class="px-4 py-2 bg-green-300 hover:bg-opacity-35">
                <button @click="toggleDropdown" class="w-full text-left">
                  닫기
                </button>
              </li>
            </ul>
          </li>
          <li class="hover:cursor-pointer" @click="handleLogout">
            <p>현재 사용자 유형: {{ userName }}</p>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "../stores/userStore.ts";
import { useSidebarStore } from "../stores/sideBarStore.ts";
import { useRouter } from "vue-router";
import { logout } from "../service/loginService.ts";
import LanguageDropDown from "../components/LanguageDropDown.vue"; // 언어 드롭다운 컴포넌트 임포트

// 사용자 유형 리스트
const userTypes: string[] = ["TR", "PH", "PS", "AU", "WH"];

// 드롭다운 상태 관리
const isDropdownOpen = ref<boolean>(false);

// Pinia user 스토어 사용
const userStore = useUserStore();

// 반응형으로 상태를 가져오기 위해 computed 사용
const userName = computed<string>(() => userStore.getUserName);

// 드롭다운 토글 함수
const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 사용자 유형 선택 함수
const selectUserType = (type: string): void => {
  userStore.setUserName(type);
  toggleDropdown();
};

// pinia 사이드바 스토어 사용
const sideBarStore = useSidebarStore();
const isSimple = computed<boolean>(() => sideBarStore.isSimple);

// 사이드바 토글 함수
const toggleSidebar = (): void => {
  sideBarStore.toggleSidebar();
};

// Vue Router 사용
const router = useRouter();

// 로그아웃 처리 함수
const handleLogout = async (): Promise<void> => {
  userStore.clearUserInfo();
  await logout();
  router.replace({ path: "/login" });
};
</script>

<style scoped></style>

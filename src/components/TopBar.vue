<template>
  <header
    class="bg-white px-4 shadow-md fixed top-0 h-16"
    :style="
      !isSimple
        ? 'left: 256px; width: calc(100% - 256px)'
        : 'left: 80px; width: calc(100% - 80px)'
    "
  >
    <div class="mx-auto flex justify-between items-center h-16">
      <!-- 사이드바 토글 버튼 -->
      <Bars3Icon
        class="cursor-pointer h-8 w-8 hover:scale-90 opacity-50"
        @click="toggleSidebar"
      />
      <nav>
        <ul class="flex space-x-4 justify-center items-center">
          <li>
            <button class="flex items-center rounded hover:bg-gray-300 w-8 h-8">
              <QuestionMarkCircleIcon class="w-full" />
            </button>
          </li>
          <li>
            <LanguageDropDown />
          </li>
          <!-- 사용자 정보 및 드롭다운 -->
          <li class="relative h-8">
            <div
              @click="toggleDropdown"
              class="h-full cursor-pointer flex gap-2"
            >
              <UserIcon class="w-8 h-8" />
              <!-- 세로로 사용자 정보 표시 -->
              <div class="flex flex-col h-full items-start justify-center">
                <p class="text-base">{{ userName }}</p>
                <p class="text-sm text-gray-500">{{ currentCompanyName }}</p>
              </div>
            </div>

            <!-- 드롭다운 메뉴 -->
            <ul
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg"
            >
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <span>Profile</span>
              </li>
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <span>Password</span>
              </li>
              <li
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                @click="handleLogout"
              >
                <span>Logout</span>
              </li>
            </ul>
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
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { QuestionMarkCircleIcon, UserIcon } from "@heroicons/vue/24/solid";
import { useI18n } from "vue-i18n";

// 다국어 지원
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Pinia user 스토어 사용
const userStore = useUserStore();
// 사용자 정보 가져오기
const userName = computed<string>(() => userStore.getMemberName);
const currentCompanyName = computed<string>(() =>
  currentLocale.value === "en" ? userStore.companyNameEn : userStore.companyName
);

// 드롭다운 상태 관리
const isDropdownOpen = ref<boolean>(false);
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

const router = useRouter();
// 로그아웃 처리 함수
const handleLogout = async (): Promise<void> => {
  userStore.clearUserInfo();
  await logout();
  router.replace({ path: "/login" });
};
</script>

<style scoped></style>

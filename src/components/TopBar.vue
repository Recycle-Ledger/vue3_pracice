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
          <!-- 도움말 버튼 -->
          <li>
            <button class="flex items-center rounded hover:bg-gray-300 w-8 h-8">
              <QuestionMarkCircleIcon class="w-full" />
            </button>
          </li>
          <!-- 언어 드롭다운 -->
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
                <p class="text-base">{{ memberName }}</p>
                <p class="text-sm text-gray-500">{{ currentCompanyName }}</p>
              </div>
            </div>
            <!-- 백드롭 -->
            <div
              v-if="isDropdownOpen"
              class="fixed inset-0 bg-black bg-opacity-0 z-20"
              @click="toggleDropdown"
            ></div>
            <!-- 드롭다운 메뉴 -->
            <ul
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-32 z-30 bg-white border rounded-md shadow-lg"
            >
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <span>{{ t("topBar.profile") }}</span>
              </li>
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <span>{{ t("topBar.password") }}</span>
              </li>
              <li
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                @click="handleLogout"
              >
                <span>{{ t("topBar.logout") }}</span>
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
import LanguageDropDown from "../components/LanguageDropDown.vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { QuestionMarkCircleIcon, UserIcon } from "@heroicons/vue/24/solid";
import { useI18n } from "vue-i18n";

// 다국어 지원
const { t, locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Pinia user 스토어 사용
const userStore = useUserStore();
// 사용자 정보 가져오기
const memberName = computed<string>(() => userStore.memberName);
const currentCompanyName = computed<string>(() =>
  currentLocale.value === "en" ? userStore.companyNameEn : userStore.companyName
);

// 드롭다운 상태 관리
const isDropdownOpen = ref<boolean>(false);
// 드롭다운 토글 함수
const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value;
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

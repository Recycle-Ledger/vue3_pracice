<template>
  <aside
    :class="isSimple ? 'w-[80px]' : 'min-w-[256px]'"
    class="fixed bg-white min-h-screen pb-4 shadow-md transition-all duration-300 left-0 h-[100dvh]"
  >
    <h2 class="h-16 flex justify-center items-center absolute">
      <img
        v-if="!isSimple"
        src="/assets/images/logo_s2_black.png"
        alt="logo_s2_black"
        class="'h-full p-2"
      />
      <img v-else src="/sub_logo.svg" alt="sub_logo" class="h-full p-2" />
    </h2>

    <nav class="mt-16 h-full pb-4" :class="{ 'overflow-y-auto': !isSimple }">
      <ul>
        <li
          v-for="(menu, index) in menus"
          :key="index"
          class="relative"
          @mouseover="showTooltip(index)"
          @mouseleave="hideTooltip"
        >
          <div v-if="menu.children">
            <div
              @click="toggleMenu(index)"
              class="py-2 px-4 flex justify-between items-center cursor-pointer hover:scale-95 hover:bg-green-300"
              :class="{
                'bg-green-400': tooltipIndex === index,
              }"
            >
              <span
                class="flex items-center gap-2 w-full"
                :class="{
                  'justify-center': isSimple,
                  'text-gray-600': tooltipIndex === index,
                }"
              >
                <component :is="menu.icon" class="w-6 h-6" />
                <p v-if="!isSimple">
                  {{ t(`sidebar.${menu.name}`) }}
                </p>
              </span>
              <div v-if="!isSimple" class="w-6 h-6">
                <ChevronDownIcon v-if="isOpen(index)" />
                <ChevronRightIcon v-else />
              </div>
            </div>

            <!-- 메뉴의 하위 항목을 보여주는 부분 -->
            <ul v-if="isOpen(index) && !isSimple" class="space-y-2">
              <li
                v-for="(child, idx) in menu.children"
                :key="idx"
                @click="clickChildMenu(index, idx)"
              >
                <router-link
                  @click="clickChildMenu(index, idx)"
                  :to="child.route"
                  class="block py-2 px-6 hover:bg-green-300"
                  :class="{
                    'bg-green-400':
                      clickedMenu === index && clickedChildMenu === idx,
                  }"
                >
                  <!-- i18n 적용: child.name을 번역된 텍스트로 변경 -->
                  - {{ t(`sidebar.${child.name}`) }}
                </router-link>
              </li>
            </ul>
          </div>

          <router-link
            v-else
            :to="menu.route"
            @click="clickMenu(index)"
            class="py-2 px-4 flex items-center gap-2 hover:bg-green-300"
            :class="{
              'justify-center': isSimple,
              'bg-green-400 text-gray-600':
                tooltipIndex === index || clickedMenu === index,
            }"
          >
            <!-- 메뉴 아이콘 -->
            <component :is="menu.icon" class="w-6 h-6" />
            <!-- i18n 적용: menu.name을 번역된 텍스트로 변경 -->
            <p v-if="!isSimple">
              {{ t(`sidebar.${menu.name}`) }}
            </p>
          </router-link>

          <!-- 툴팁 -->
          <div
            class="absolute left-full top-0 bg-green-300 text-black w-48 pt-2 z-50"
            :class="{ 'pb-2': !menu.children }"
            v-if="isSimple && tooltipIndex === index"
          >
            <div v-if="menu.children" class="w-full">
              <!-- i18n 적용: menu.name을 번역된 텍스트로 변경 -->
              <p class="w-full pl-4">
                {{ t(`sidebar.${menu.name}`) }}
              </p>

              <!-- 하위 메뉴 -->
              <ul
                v-if="menu.children"
                class="mt-2 bg-green-200 text-black w-full"
              >
                <li
                  v-for="(child, index) in menu.children"
                  :key="index"
                  class="hover:bg-white text-sm py-2 px-4 w-full cursor-pointer"
                >
                  <router-link :to="child.route">
                    <!-- i18n 적용: child.name을 번역된 텍스트로 변경 -->
                    - {{ t(`sidebar.${child.name}`, child.defaultName) }}
                  </router-link>
                </li>
              </ul>
            </div>
            <router-link
              v-else
              @click="clickMenu(index)"
              :to="menu.route"
              class="w-full"
            >
              <!-- i18n 적용: menu.name을 번역된 텍스트로 변경 -->
              <p class="pl-4">
                {{ t(`sidebar.${menu.name}`) }}
              </p>
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount, onMounted } from "vue";
import { useUserStore } from "../stores/userStore.ts";
import { useSidebarStore } from "../stores/sideBarStore.ts";
import { menuTypes } from "../constants/SideBarConstants.ts";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n"; // 다국어 지원을 위한 훅

const { t } = useI18n(); // 다국어 텍스트와 언어 설정 훅
// Pinia 스토어 사용
const userStore = useUserStore();
const userType = computed<string>(() => userStore.getCompanyType);

// 사이드바 상태 스토어 사용
const sidebarStore = useSidebarStore();
const isSimple = computed<boolean>(() => sidebarStore.isSimple);

// 창 크기에 따라 자동으로 심플 모드로 전환
const updateSidebarMode = () => {
  if (window.innerWidth < 768) {
    sidebarStore.isSimple = true; // 작은 화면일 때 심플 모드
  } else {
    sidebarStore.isSimple = false; // 큰 화면일 때 풀 모드
  }
};

// 창 크기 변화 감지
onMounted(() => {
  window.addEventListener("resize", updateSidebarMode);
  updateSidebarMode(); // 초기 로드 시 모드 설정
});

// 창 크기 변화 감지 중지
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSidebarMode);
});

// 메뉴 상태 관리
const openMenus = ref<number[]>([]); // 열린 메뉴의 인덱스 저장

// 사용자 유형에 맞는 메뉴 가져오기
const menus = computed(() => {
  return menuTypes[userType.value];
});

const tooltipIndex = ref<number>(-1); // 현재 툴팁이 보이는 메뉴 인덱스

// 마우스 오버 시 툴팁 표시
const showTooltip = (index: number): void => {
  tooltipIndex.value = index;
};

// 마우스가 떠나면 툴팁 숨김
const hideTooltip = (): void => {
  tooltipIndex.value = -1;
};

// 메뉴 클릭 상태 관리
const clickedMenu = ref<number | null>(null);
const clickedChildMenu = ref<number | null>(null);

// 상위 메뉴 클릭 시 처리
const clickMenu = (index: number) => {
  clickedMenu.value = index;
  clickedChildMenu.value = null; // 하위 메뉴 초기화
};

// 하위 메뉴 클릭 시 처리
const clickChildMenu = (parentIndex: number, childIndex: number) => {
  clickedMenu.value = parentIndex;
  clickedChildMenu.value = childIndex;
};

// 특정 메뉴가 열렸는지 여부 확인
const isOpen = (index: number): boolean => openMenus.value.includes(index);

// 메뉴 접기/펼치기 토글
const toggleMenu = (index: number): void => {
  if (isOpen(index)) {
    openMenus.value = openMenus.value.filter((i) => i !== index);
  } else {
    openMenus.value.push(index);
  }
};
</script>

<style scoped></style>

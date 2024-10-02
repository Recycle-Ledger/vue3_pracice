<template>
  <aside
    :class="isSimple ? 'w-[80px]' : 'min-w-[256px]'"
    class="fixed bg-white min-h-screen py-4 shadow-md transition-all duration-300"
  >
    <h2 class="text-lg font-bold mb-4 text-center">
      <img
        v-if="!isSimple"
        src="/assets/images/logo_s2_black.png"
        alt="logo_s2_black"
      />
      <img v-else src="/sub_logo.svg" alt="sub_logo" />
    </h2>
    <!-- 심플 모드에서는 타이틀 숨김 -->

    <nav>
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
              class="py-2 px-4 flex justify-between"
              :class="{
                'bg-green-400': tooltipIndex === index,
              }"
            >
              <!-- 심플 모드에서는 이름 대신 첫 글자 표시 -->
              <span>{{
                isSimple ? menu.name.substring(0, 2) : menu.name
              }}</span>
              <span v-if="!isSimple">{{ isOpen(index) ? "▼" : "▶" }}</span>
            </div>

            <ul
              v-if="menu.children && isOpen(index) && !isSimple"
              class="space-y-2"
            >
              <li v-for="(child, idx) in menu.children" :key="idx">
                <router-link
                  @click="clickMenu(0)"
                  :to="child.route"
                  class="block py-2 px-6 hover:bg-green-400"
                >
                  - {{ child.name }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-link
            v-else
            :to="menu.route"
            @click="clickMenu(index)"
            class="block py-2 px-4"
            :class="{
              'bg-green-400': tooltipIndex === index || clickedMenu === index,
            }"
          >
            {{ isSimple ? menu.name.substring(0, 2) : menu.name }}
            <!-- 심플 모드에서는 첫 글자만 표시 -->
          </router-link>
          <!-- 툴팁 -->
          <div
            class="absolute left-full top-0 bg-green-400 text-black w-48 pt-2"
            :class="{ 'pb-2': !menu.children }"
            v-if="isSimple && tooltipIndex === index"
          >
            <div v-if="menu.children" class="w-full">
              <p class="w-full pl-4">
                {{ menu.name }}
              </p>

              <!-- 하위 메뉴 -->
              <ul
                v-if="menu.children"
                class="mt-2 bg-green-200 text-black w-full"
              >
                <li
                  v-for="(child, index) in menu.children"
                  :key="index"
                  class="hover:bg-white text-sm py-2 px-4 w-full"
                >
                  <router-link @click="clickMenu(index)" :to="child.route">
                    - {{ child.name }}
                  </router-link>
                </li>
              </ul>
            </div>
            <router-link v-else @click="clickMenu(index)" :to="menu.route" class="w-full">
              <p class="pl-4">
                {{ menu.name }}
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
import { useSidebarStore } from "../stores/sideBarStore.ts"; // Pinia 스토어 임포트

// 사용자 유형을 pinia에서 가져옴, 반응형을 위해 computed사용
const userStore = useUserStore();
const userType = computed<string>(() => userStore.getUserName);

// 사이드바 상태 스토어 사용
const sidebarStore = useSidebarStore();
const isSimple = computed<boolean>(() => sidebarStore.isSimple); // 심플 모드인지 여부

// 메뉴 타입 정의
interface MenuItem {
  name: string;
  route?: string;
  children?: MenuItem[];
}

interface MenuConfig {
  [key: string]: MenuItem[];
}

const menuConfig: MenuConfig = {
  TR: [
    { name: "대시보드", route: "/dashboard" },
    { name: "회원 목록", route: "/members" },
    { name: "창고 목록", route: "/warehouse" },
    { name: "구매 요청", route: "/purchase-request" },
    { name: "구매 내역", route: "/purchase-history" },
    { name: "재고 목록", route: "/inventory" },
    { name: "판매 요청", route: "/sales-request" },
    { name: "판매 내역", route: "/sales-history" },
  ],
  PH: [
    { name: "대시보드", route: "/" },
    { name: "회원 목록", route: "/members" },
    {
      name: "UCO",
      children: [
        { name: "구매 요청", route: "/uco/purchase-request" },
        { name: "구매 내역", route: "/uco/purchase-history" },
        { name: "재고 목록", route: "/uco/inventory" },
      ],
    },
    {
      name: "Tallow",
      children: [
        { name: "구매 요청", route: "/tallow/purchase-request" },
        { name: "구매 내역", route: "/tallow/purchase-history" },
        { name: "국산우지 내역", route: "/tallow/local-history" },
      ],
    },
  ],
  PS: [
    { name: "대시보드", route: "/" },
    { name: "회원 목록", route: "/members" },
    {
      name: "UCO",
      children: [
        { name: "구매 요청", route: "/uco/purchase-request" },
        { name: "구매 내역", route: "/uco/purchase-history" },
        { name: "재고 목록", route: "/uco/inventory" },
        { name: "재고 달력", route: "/uco/calendar" },
        { name: "AI 인식", route: "/uco/ai" },
        { name: "인증 요청", route: "/uco/certification-request" },
        { name: "인증 내역", route: "/uco/certification-history" },
        { name: "판매 요청", route: "/uco/sales-request" },
        { name: "판매 내역", route: "/uco/sales-history" },
      ],
    },
    {
      name: "Tallow",
      children: [
        { name: "국산우지 파일", route: "/tallow/local-file" },
        { name: "국산우지 내역", route: "/tallow/local-history" },
        { name: "국산우지 판매", route: "/tallow/local-sales" },
        { name: "판매 요청", route: "/tallow/sales-request" },
        { name: "판매 내역", route: "/tallow/sales-history" },
      ],
    },
    {
      name: "fish fat",
      children: [
        { name: "구매 요청", route: "/fishfat/purchase-request" },
        { name: "구매 내역", route: "/fishfat/purchase-history" },
      ],
    },
    {
      name: "Statistics",
      children: [{ name: "UCO 일별 통계", route: "/uco/daily-stats" }],
    },
  ],
  AU: [
    { name: "대시보드", route: "/" },
    { name: "회원 목록", route: "/members" },
    { name: "인증 요청", route: "/certification-request" },
    { name: "인증 내역", route: "/certification-history" },
  ],
  WH: [
    { name: "대시보드", route: "/" },
    { name: "회원 목록", route: "/members" },
    { name: "창고 목록", route: "/warehouse" },
    { name: "구매 내역", route: "/purchase-history" },
    { name: "재고 목록", route: "/inventory" },
    { name: "AI 인식", route: "/ai" },
    { name: "판매 요청", route: "/sales-request" },
    { name: "판매 내역", route: "/sales-history" },
    {
      name: "Statistics",
      children: [{ name: "UCO 일별 통계", route: "/uco/daily-stats" }],
    },
  ],
};

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
const menus = computed<MenuItem[]>(() => {
  return menuConfig[userType.value];
});

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

const tooltipIndex = ref<number>(-1); // 현재 툴팁이 보이는 메뉴 인덱스

// 마우스 오버 시 툴팁 표시
const showTooltip = (index: number): void => {
  tooltipIndex.value = index;
};

// 마우스가 떠나면 툴팁 숨김
const hideTooltip = (): void => {
  tooltipIndex.value = -1;
};

const clickedMenu = ref<number>(0);
const clickMenu = (idx: number) => {
  clickedMenu.value = idx;
};
</script>

<style scoped></style>

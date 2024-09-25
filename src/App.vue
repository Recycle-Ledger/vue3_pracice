<template>
  <div id="app" class="flex min-w-[648px]">
    <!-- 사이드바 -->
    <SideBar />

    <div class="flex-1 flex flex-col">
      <!-- 상단 바 -->
      <TopBar />

      <!-- 메인 윈도우 -->
      <main
        class="mt-16 p-4 bg-gray-200 flex-1 fixed overflow-y-auto -z-10"
        :style="
          !isSimple
            ? 'left: 256px; width: calc(100% - 256px); height: calc(100vh - 64px)'
            : 'left: 80px; width: calc(100% - 80px); height: calc(100vh - 64px)'
        "
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import TopBar from "./components/TopBar.vue";
import SideBar from "./components/SideBar.vue";
import { useSidebarStore } from "./stores/sideBarStore";
import { ref, computed } from "vue";

const sideBarStore = useSidebarStore();
const isSimple = computed(() => sideBarStore.isSimple);
</script>

<style scoped>
/* 추가적인 레이아웃 스타일을 원하면 여기에 작성 */
</style>

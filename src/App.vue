<template>
  <div id="app" class="flex min-w-[648px]">
    <!-- 사이드바 -->
    <SideBar v-if="isLogin" />

    <div class="flex-1 flex flex-col">
      <!-- 상단 바 -->
      <TopBar v-if="isLogin" />

      <!-- 메인 윈도우 -->
      <main
        v-if="isLogin"
        class="mt-16 p-4 bg-gray-200 flex-1 fixed overflow-y-auto -z-10"
        :style="
          !isSimple
            ? 'left: 256px; width: calc(100% - 256px); height: calc(100vh - 64px)'
            : 'left: 80px; width: calc(100% - 80px); height: calc(100vh - 64px)'
        "
      >
        <router-view />
      </main>
      <main v-else>
        <Login />
      </main>
    </div>
  </div>
</template>

<script setup>
import TopBar from "./components/TopBar.vue";
import SideBar from "./components/SideBar.vue";
import { useSidebarStore } from "./stores/sideBarStore";
import { useUserStore } from "./stores/userStore";
import { ref, computed } from "vue";
import Login from "./views/Login.vue";

const sideBarStore = useSidebarStore();
const isSimple = computed < Boolean > (() => sideBarStore.isSimple);

const userState = useUserStore();
const isLogin = computed < Boolean > (() => useUserStore.isLogin);
</script>

<style scoped></style>

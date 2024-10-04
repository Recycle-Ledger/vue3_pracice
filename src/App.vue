<template>
  <div id="app" class="flex min-w-[648px]">
    <!-- 사이드바 -->
    <SideBar v-if="isLogin" />

    <div class="flex flex-col">
      <!-- 상단 바 -->
      <TopBar v-if="isLogin" />

      <!-- 메인 윈도우 -->
      <main
        v-if="isLogin"
        class="mt-16 p-4 bg-gray-200 fixed overflow-y-auto -z-10"
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

<script setup lang="ts">
import { computed, watch } from "vue";
import { useUserStore } from "./stores/userStore"; // Pinia 스토어 사용
import { useSidebarStore } from "./stores/sideBarStore"; // 사이드바 스토어
import TopBar from "./components/TopBar.vue";
import SideBar from "./components/SideBar.vue";
import Login from "./views/Login.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const sideBarStore = useSidebarStore();
const isSimple = computed(() => sideBarStore.isSimple);

// Pinia에서 isLogin 상태를 가져옴
const userStore = useUserStore();
const isLogin = computed(() => userStore.getIsLogin);

// isLogin 상태 변화를 감지하는 watch
watch(isLogin, () => {
  if (isLogin) {
    router.replace("/dashboard");
  } else {
    router.replace("/");
  }
});
</script>

<style scoped></style>

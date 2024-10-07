import { defineStore } from "pinia";

// 사이드바 상태 타입
interface sideBarState {
  isSimple: boolean;
}

export const useSidebarStore = defineStore("sideBar", {
  state: (): sideBarState => ({
    isSimple: false, // 사이드바가 심플한 상태인지 여부
  }),
  actions: {
    toggleSidebar(): void {
      this.isSimple = !this.isSimple; // 사이드바를 심플/복잡 모드로 토글
    },
  },
  persist: true,
});

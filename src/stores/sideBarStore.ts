import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isSimple: false, // 사이드바가 심플한 상태인지 여부
  }),
  actions: {
    toggleSidebar() {
      this.isSimple = !this.isSimple; // 사이드바를 심플/복잡 모드로 토글
    },
  },
});

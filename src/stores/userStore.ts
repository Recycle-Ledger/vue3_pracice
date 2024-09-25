import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: 'WH', // 사용자명을 저장할 상태
  }),
  actions: {
    setUsername(name: string) {
      this.username = name; // 사용자명을 설정하는 액션
    },
  },
  getters: {
    getUsername: (state) => state.username, // 사용자명을 가져오는 게터
  },
});

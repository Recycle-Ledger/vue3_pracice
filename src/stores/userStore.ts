import { defineStore } from "pinia";

// 유저 상태 타입
interface UserState {
  userName: string;
  isLogin: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userName: "WH", // 사용자명을 저장할 상태
    isLogin: false // 로그인 여부를 알려주는 임시 변수 -> 추후 토큰 여부로 판단
  }),
  actions: {
    setUserName(name: string) {
      this.userName = name; // 사용자명을 설정하는 액션
    },
    setIsLogin(successLogin: boolean) {
      this.isLogin = successLogin;
    }
  },
  getters: {
    getUserName: (state): string => state.userName, // 사용자명을 가져오는 게터
    getIsLogin: (state): boolean => state.isLogin, // 로그인 상태를 가져오는 게터
  },
  persist: true
});

import { defineStore } from "pinia";

// 유저 상태 타입
interface UserState {
  memberName: string;
  companyId: string;
  companyName: string;
  companyNameEn: string;
  companyType: string;
  role: string;
  isLogin: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    memberName: "",
    companyId: "",
    companyName: "",
    companyNameEn: "",
    companyType: "",
    role: "",
    isLogin: false,
  }),
  actions: {
    setUserInfo(data: Partial<UserState>) {
      this.memberName = data.memberName || "";
      this.companyId = data.companyId || "";
      this.companyName = data.companyName || "";
      this.companyNameEn = data.companyNameEn || "";
      this.companyType = data.companyType || "";
      this.role = data.role || "";
      this.isLogin = true;
    },
    loadUserInfo() {
      const userData = sessionStorage.getItem("user");
      if (userData) {
        Object.assign(this.$state, JSON.parse(userData));
      }
    },
    clearUserInfo() {
      this.memberName = "";
      this.companyId = "";
      this.companyName = "";
      this.companyNameEn = "";
      this.companyType = "";
      this.role = "";
      this.isLogin = false;
    },
  },
  getters: {
    // `isLogin`을 반환하는 getter
    getIsLogin: (state): boolean => state.isLogin,
    getCompanyType: (state): string => state.companyType
  },
  persist: {
    storage: sessionStorage,
  },
});

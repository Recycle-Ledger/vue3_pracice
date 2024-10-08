import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import { createPinia } from 'pinia';
import i18n from './i18n'; // i18n 설정 파일 가져오기
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // 플러그인 임포트


const app = createApp(App);
// Pinia 스토어 생성
const pinia = createPinia();
// 플러그인 등록
pinia.use(piniaPluginPersistedstate);


// 피니아 등록
app.use(pinia);
// i18n을 Vue 애플리케이션에 등록
app.use(i18n);
// 라우터를 Vue 애플리케이션에 사용하도록 설정
app.use(router);
app.mount('#app');

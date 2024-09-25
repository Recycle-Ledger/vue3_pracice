import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import { createPinia } from 'pinia';


const app = createApp(App);
// Pinia 스토어 생성
const pinia = createPinia();
app.use(pinia);

// 라우터를 Vue 애플리케이션에 사용하도록 설정
app.use(router);
app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router';

// 페이지 컴포넌트 임포트
import Dashboard from '../views/Dashboard.vue';
import Members from '../views/Members.vue';
import Warehouse from '../views/Warehouse.vue';
import PurchaseRequest from '../views/PurchaseRequest.vue';
import PurchaseHistory from '../views/PurchaseHistory.vue';
import Inventory from '../views/Inventory.vue';
import SalesRequest from '../views/SalesRequest.vue';
import SalesHistory from '../views/SalesHistory.vue';
import AiRecognition from '../views/AiRecognition.vue';
import CertificationRequest from '../views/CertificationRequest.vue';
import CertificationHistory from '../views/CertificationHistory.vue';
import Login from '../views/Login.vue';

// 라우터 설정
const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/members', name: 'Members', component: Members },
  { path: '/warehouse', name: 'Warehouse', component: Warehouse },
  { path: '/purchase-request', name: 'PurchaseRequest', component: PurchaseRequest },
  { path: '/purchase-history', name: 'PurchaseHistory', component: PurchaseHistory },
  { path: '/inventory', name: 'Inventory', component: Inventory },
  { path: '/sales-request', name: 'SalesRequest', component: SalesRequest },
  { path: '/sales-history', name: 'SalesHistory', component: SalesHistory },
  // // UCO
  // { path: '/uco/purchase-request', name: 'UcoPurchaseRequest', component: UcoPurchaseRequest },
  // { path: '/uco/purchase-history', name: 'UcoPurchaseHistory', component: UcoPurchaseHistory },
  // { path: '/uco/inventory', name: 'UcoInventory', component: UcoInventory },
  // { path: '/uco/calendar', name: 'UcoCalendar', component: UcoCalendar },
  // { path: '/uco/ai', name: 'UcoAiRecognition', component: UcoAiRecognition },
  // { path: '/uco/certification-request', name: 'UcoCertificationRequest', component: UcoCertificationRequest },
  // { path: '/uco/certification-history', name: 'UcoCertificationHistory', component: UcoCertificationHistory },
  // { path: '/uco/sales-request', name: 'UcoSalesRequest', component: UcoSalesRequest },
  // { path: '/uco/sales-history', name: 'UcoSalesHistory', component: UcoSalesHistory },
  // // Tallow
  // { path: '/tallow/purchase-request', name: 'TallowPurchaseRequest', component: TallowPurchaseRequest },
  // { path: '/tallow/purchase-history', name: 'TallowPurchaseHistory', component: TallowPurchaseHistory },
  // { path: '/tallow/local-history', name: 'TallowLocalHistory', component: TallowLocalHistory },
  // { path: '/tallow/local-file', name: 'TallowLocalFile', component: TallowLocalFile },
  // { path: '/tallow/local-sales', name: 'TallowLocalSales', component: TallowLocalSales },
  // // FishFat
  // { path: '/fishfat/purchase-request', name: 'FishFatPurchaseRequest', component: FishFatPurchaseRequest },
  // { path: '/fishfat/purchase-history', name: 'FishFatPurchaseHistory', component: FishFatPurchaseHistory },
  // // Statistics
  // { path: '/uco/daily-stats', name: 'UcoDailyStats', component: UcoDailyStats },
  // AU 관련 인증
  { path: '/certification-request', name: 'CertificationRequest', component: CertificationRequest },
  { path: '/certification-history', name: 'CertificationHistory', component: CertificationHistory },
  // AI Recognition (wh)
  { path: '/ai', name: 'AiRecognition', component: AiRecognition },
  {
    path: '/',
    redirect: '/login', // 기본 경로를 로그인 페이지로 리다이렉트
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',  // 404 처리로, 모든 알 수 없는 경로는 로그인으로 리다이렉트
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

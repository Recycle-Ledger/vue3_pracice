<template>
  <div class="w-full flex flex-col gap-5 mx-auto">
    <div
      class="w-full flex flex-col md:flex-row justify-center gap-5 h-full items-center"
    >
      <div
        :class="{
          'md:w-[360px] w-full flex flex-col gap-5 flex-shrink-0':
            userType !== 'AU',
          'w-full flex gap-5': userType === 'AU',
        }"
      >
        <!-- v-for를 이용한 DashboardCard 렌더링 -->
        <DashboardCard
          v-for="(card, index) in dashboardCards"
          :key="index"
          :title="card.title"
          :value="card.value"
          :icon="card.icon"
          :bgColor="card.bgColor"
          :textColor="card.textColor"
          :needFormat="card.needFormat"
          @click="handleCardClick(index)"
          :class="{
            'border-2 border-blue-500': selectedCardIndex === index, // 선택된 카드에 스타일 적용
          }"
        />
      </div>

      <!-- 차트 렌더링 -->
      <div v-if="userType !== 'AU'" class="w-full">
        <BarChart v-if="selectedChart === 'BarChart'" />
        <LineChart v-if="selectedChart === 'LineChart'" />
        <DoughnutChart v-if="selectedChart === 'DoughnutChart'" />
      </div>
    </div>

    <!-- userType PH인 경우 다른 테이블 표시 -->
    <div v-if="userType === 'PH'">
      <DashboardDataTable />
    </div>

    <!-- PH가 아닌 경우 LedgerTable 표시 -->
    <div v-else>
      <LedgerTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardCard from "../components/dashboard/DashboardCard.vue";
import LineChart from "../components/dashboard/LineChart.vue";
import BarChart from "../components/dashboard/BarChart.vue";
import DoughnutChart from "../components/dashboard/DoughnutChart.vue";
import DashboardDataTable from "../components/dashboard/DashboardDataTable.vue";
import LedgerTable from "../components/dashboard/LedgerTable.vue";
import { getSummary, SummaryData } from "../service/dashboard/summaryService";
import { onMounted, ref, computed } from "vue";
import { checkAndRedirectToken } from "../service/tokenCheck";
import { useUserStore } from "../stores/userStore";

// summary 데이터 상태 저장
const summaryData = ref<SummaryData>({
  totalStock: 0,
  totalPurchased: 0,
  certification: {
    inProgress: 0,
    approved: 0,
    reject: 0,
  },
});

const userStore = useUserStore();
const userType = computed<string>(() => userStore.getCompanyType);

// 선택된 카드 상태와 기본 차트 상태 관리
const selectedCardIndex = ref(0); // 기본적으로 첫 번째 카드 선택
const selectedChart = ref("BarChart"); // 기본적으로 BarChart

// DashboardCard 배열의 타입 정의
type DashboardCardType = {
  title: string;
  value: number;
  icon: string;
  bgColor: string;
  textColor: string;
  needFormat: boolean;
};

// DashboardCard 배열 생성
const dashboardCards = ref<DashboardCardType[]>([]);

// 카드 클릭 핸들러 함수
const handleCardClick = (index: number) => {
  selectedCardIndex.value = index;

  // 카드 인덱스에 따라 차트 변경
  if (index === 0) {
    selectedChart.value = "BarChart"; // 총 구매 수량 카드 클릭 시 BarChart
  } else if (index === 1) {
    selectedChart.value = "LineChart"; // 현재 재고 물량 카드 클릭 시 LineChart
  } else {
    selectedChart.value = "DoughnutChart"; // 인증/판매 카드 클릭 시 DoughnutChart
  }
};

// 데이터가 존재할 때만 대시보드 카드에 추가
onMounted(async () => {
  const token: string = await checkAndRedirectToken();
  const data: SummaryData | null = await getSummary(token);
  if (!data) {
    console.error(data);
  }
  summaryData.value = data!;

  // AU가 아닐 때만 추가
  if (userType.value !== "AU") {
    dashboardCards.value.push({
      title: "dashboard.totalPurchaseQuantity",
      value: summaryData.value.totalPurchased,
      icon: "CurrencyDollarIcon",
      bgColor: "yellow",
      textColor: "yellow",
      needFormat: true,
    });
  }

  // AU가 아닐 때만 추가
  if (userType.value !== "AU") {
    dashboardCards.value.push({
      title: "dashboard.currentStockQuantity",
      value: summaryData.value.totalStock,
      icon: "HomeModernIcon",
      bgColor: "red",
      textColor: "red",
      needFormat: true,
    });
  }

  // certification 데이터 각각을 별도 카드로 추가 (userType에 따라 titlePrefix 번역)
  const titlePrefix =
    userType.value === "AU" || userType.value === "PS"
      ? "dashboard.certification"
      : "dashboard.purchase";

  dashboardCards.value.push({
    title: titlePrefix + "InProgress",
    value: summaryData.value.certification.inProgress,
    icon: "CheckBadgeIcon",
    bgColor: "blue",
    textColor: "blue",
    needFormat: false,
  });

  dashboardCards.value.push({
    title: titlePrefix + "Completed",
    value: summaryData.value.certification.approved,
    icon: "CheckBadgeIcon",
    bgColor: "blue",
    textColor: "blue",
    needFormat: false,
  });

  dashboardCards.value.push({
    title: titlePrefix + "Rejected",
    value: summaryData.value.certification.reject,
    icon: "CheckBadgeIcon",
    bgColor: "blue",
    textColor: "blue",
    needFormat: false,
  });
});
</script>

<style scoped></style>

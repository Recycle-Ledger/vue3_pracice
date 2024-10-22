<template>
  <div
    class="w-full flex flex-col lg:flex-row justify-center gap-5 items-start"
  >
    <div
      :class="{
        'lg:max-w-[360px] min-w-[280px] w-full flex flex-col gap-5':
          userType !== 'AU',
        'w-full flex gap-5': userType === 'AU',
      }"
    >
      <!-- v-for를 이용한 DashboardCard 렌더링 -->
      <DashboardCard
        v-for="(card, index) in dashboardCards"
        :key="card.title"
        :title="card.title"
        :value="card.value"
        :icon="card.icon"
        :bgColor="card.bgColor"
        :textColor="card.textColor"
        :needFormat="card.needFormat"
        :chartType="card.chartType"
        :isFirstCard="index === 0"
      />
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
  import DashboardCard from '../components/dashboard/DashboardCard.vue';
  import DashboardDataTable from '../components/dashboard/DashboardDataTable.vue';
  import LedgerTable from '../components/dashboard/LedgerTable.vue';
  import { getSummary, SummaryData } from '../service/dashboard/summaryService';
  import { onMounted, ref, computed } from 'vue';
  import { checkAndRedirectToken } from '../service/tokenCheck';
  import { useUserStore } from '../stores/userStore';

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

  // DashboardCard 배열의 타입 정의
  type DashboardCardType = {
    title: string;
    value: number;
    icon: string;
    bgColor: string;
    textColor: string;
    needFormat: boolean;
    chartType: string; // 각 카드의 차트 타입 정의
  };

  // DashboardCard 배열 생성
  const dashboardCards = ref<DashboardCardType[]>([]);

  // 데이터가 존재할 때만 대시보드 카드에 추가
  onMounted(async () => {
    const token: string = await checkAndRedirectToken();
    const data: SummaryData | null = await getSummary(token);
    if (!data) {
      console.error(data);
    }
    summaryData.value = data!;

    // AU가 아닐 때만 추가
    if (userType.value !== 'AU') {
      dashboardCards.value.push({
        title: 'dashboard.totalPurchaseQuantity',
        value: summaryData.value.totalPurchased,
        icon: 'CurrencyDollarIcon',
        bgColor: 'yellow',
        textColor: 'yellow',
        needFormat: true,
        chartType: 'BarChart',
      });
    }

    // AU가 아닐 때만 추가
    if (userType.value !== 'AU') {
      dashboardCards.value.push({
        title: 'dashboard.currentStockQuantity',
        value: summaryData.value.totalStock,
        icon: 'HomeModernIcon',
        bgColor: 'red',
        textColor: 'red',
        needFormat: true,
        chartType: 'LineChart',
      });
    }

    // certification 데이터 각각을 별도 카드로 추가 (userType에 따라 titlePrefix 번역)
    const titlePrefix =
      userType.value === 'AU' || userType.value === 'PS'
        ? 'dashboard.certification'
        : 'dashboard.purchase';

    dashboardCards.value.push({
      title: titlePrefix + 'InProgress',
      value: summaryData.value.certification.inProgress,
      icon: 'CheckBadgeIcon',
      bgColor: 'blue',
      textColor: 'blue',
      needFormat: false,
      chartType: 'DoughnutChart',
    });

    dashboardCards.value.push({
      title: titlePrefix + 'Completed',
      value: summaryData.value.certification.approved,
      icon: 'CheckBadgeIcon',
      bgColor: 'blue',
      textColor: 'blue',
      needFormat: false,
      chartType: 'DoughnutChart',
    });

    dashboardCards.value.push({
      title: titlePrefix + 'Rejected',
      value: summaryData.value.certification.reject,
      icon: 'CheckBadgeIcon',
      bgColor: 'blue',
      textColor: 'blue',
      needFormat: false,
      chartType: 'DoughnutChart',
    });
  });
</script>

<style scoped></style>

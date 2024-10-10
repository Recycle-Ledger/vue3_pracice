<template>
  <div class="flex flex-col gap-5 mx-auto">
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-5">
      <DashboardCard
        :title="t('dashboard.totalPurchaseQuantity')"
        :value="summaryData.totalPurchased"
        icon="CurrencyDollarIcon"
        bgColor="yellow"
        textColor="yellow"
      />
      <DashboardCard
        :title="t('dashboard.currentStockQuantity')"
        :value="summaryData.totalStock"
        icon="HomeModernIcon"
        bgColor="red"
        textColor="red"
      />
      <DashboardCard
        :title="t('dashboard.certificationProgress')"
        :value="summaryData.certification"
        icon="CheckBadgeIcon"
        bgColor="blue"
        textColor="blue"
      />
    </div>

    <!-- userType AU가 아닌 경우에만 그래프 표시 -->
    <div
      v-if="userType !== 'AU'"
      class="grid lg:grid-cols-3 md:grid-cols-1 gap-5"
    >
      <BarChart />
      <LineChart />
      <DoughnutChart />
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
import { useI18n } from "vue-i18n";
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

// i18n 함수 가져오기
const { t } = useI18n();

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

onMounted(async () => {
  const token: string = await checkAndRedirectToken();
  const data: SummaryData | null = await getSummary(token);
  if (!data) {
    console.error(data);
  }
  summaryData.value = data!;
});
</script>

<style scoped></style>

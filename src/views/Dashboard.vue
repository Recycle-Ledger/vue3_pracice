<template>
  <div class="flex flex-col gap-5 mx-auto">
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-5">
      <DashboardCard
        title="총 구매 물량"
        :value="summaryData.totalPurchased"
        icon="CurrencyDollarIcon"
        bgColor="yellow"
        textColor="yellow"
      />
      <DashboardCard
        title="현재 재고 물량"
        :value="summaryData.totalStock"
        icon="HomeModernIcon"
        bgColor="red"
        textColor="red"
      />
      <DashboardCard
        title="인증 진행"
        :value="summaryData.certification"
        icon="CheckBadgeIcon"
        bgColor="blue"
        textColor="blue"
      />
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-5">
      <BarChart />
      <LineChart />
      <DoughnutChart />
    </div>
    <div>
      <DataTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardCard from "../components/dashboard/DashboardCard.vue";
import LineChart from "../components/dashboard/LineChart.vue";
import BarChart from "../components/dashboard/BarChart.vue";
import DoughnutChart from "../components/dashboard/DoughnutChart.vue";
import DataTable from "../components/table/DataTable.vue";
import { getSummary, SummaryData } from "../service/dashboard/summaryService";
import { onMounted, ref } from "vue";
import { checkAndRedirectToken } from "../service/tokenCheck";

const summaryData = ref<SummaryData>({
  totalStock: 0,
  totalPurchased: 0,
  certification: {
    inProgress: 0,
    approved: 0,
    reject: 0,
  },
});

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

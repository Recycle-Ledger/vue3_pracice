<template>
  <div class="flex flex-col gap-5 mx-auto">
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-5">
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
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
</script>

<style scoped></style>

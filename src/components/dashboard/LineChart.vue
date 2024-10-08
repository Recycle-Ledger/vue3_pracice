<template>
  <div class="w-full h-[248px] bg-white p-3 justify-center items-center flex">
    <canvas id="lineChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Chart, { ChartConfiguration, ChartItem } from "chart.js/auto";
import { getStockGraph } from "../../service/dashboard/graphService";
import { checkAndRedirectToken } from "../../service/tokenCheck";

const rawData = ref([
  { date: "2024-05", weight: 1 },
  { date: "2024-06", weight: 2 },
  { date: "2024-07", weight: 3 },
  { date: "2024-08", weight: 4 },
]);

const labels = computed(() => rawData.value.map((element) => element.date));
const dataset = computed(() => [
  {
    label: "Stock Weight",
    data: rawData.value.map((element) => element.weight),
    fill: false, // 선 안쪽을 채우지 않음
    backgroundColor: "rgba(54, 162, 235, 0.2)", // 배경색
    borderColor: "rgba(54, 162, 235, 1)", // 경계선 색상
    borderWidth: 2,
  },
]);

const config = computed<ChartConfiguration>(() => ({
  type: "line",
  data: {
    labels: labels.value,
    datasets: dataset.value,
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  },
}));

const fetchChartData = async () => {
  const token: string = await checkAndRedirectToken();
  const data = await getStockGraph(token);
  if (data) {
    rawData.value = data;
  } else {
    console.error("그래프 데이터를 가져오는 데 실패했습니다.");
  }
};

onMounted(async () => {
  await fetchChartData();
  const canvasTag = document.getElementById("lineChart") as ChartItem;
  new Chart(canvasTag, config.value);
});
</script>

<style scoped></style>

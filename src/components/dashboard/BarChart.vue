<template>
  <div class="w-full h-[248px] bg-white p-3 justify-center items-center flex">
    <canvas id="barChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Chart, { ChartConfiguration, ChartItem } from "chart.js/auto";
import {
  getPurchaseGraph,
  graphData,
} from "../../service/dashboard/graphService";
import { checkAndRedirectToken } from "../../service/tokenCheck";

// ref로 데이터를 감지하고 초기값 더미 데이터 설정
const rawData = ref([
  { date: "2024-05", weight: 1 },
  { date: "2024-06", weight: 2 },
  { date: "2024-07", weight: 3 },
  { date: "2024-08", weight: 4 },
]);

// computed로 labels와 dataset을 동적으로 계산
const labels = computed(() => rawData.value.map((element) => element.date));
const dataset = computed(() => rawData.value.map((element) => element.weight));

const chartInstance = ref<Chart | null>(null);

const config = computed<ChartConfiguration>(() => ({
  type: "bar",
  data: {
    labels: labels.value, // labels가 변경될 때마다 자동 업데이트
    datasets: [
      {
        label: "Purchase Weight",
        data: dataset.value, // dataset이 변경될 때마다 자동 업데이트
        backgroundColor: [
          //색상
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          //경계선 색상
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
}));

// API 호출 후 데이터를 차트에 반영하는 함수
const fetchChartData = async () => {
  const token: string = await checkAndRedirectToken();
  const data: graphData[] | null = await getPurchaseGraph(token);

  if (data) {
    rawData.value = data;
  } else {
    console.error("그래프 데이터 얻기 실패");
  }
};

onMounted(async () => {
  await fetchChartData();

  const canvasTag = document.getElementById("barChart") as ChartItem;
  chartInstance.value = new Chart(canvasTag, config.value);
});
</script>

<style scoped></style>

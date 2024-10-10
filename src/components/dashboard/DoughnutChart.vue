<template>
  <div class="w-full h-[248px] bg-white p-3 justify-center flex">
    <canvas id="doughnutChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Chart, { ChartConfiguration, ChartItem } from "chart.js/auto";
import {
  getCountryGraph,
  CountryGraphData,
} from "../../service/dashboard/graphService";
import { checkAndRedirectToken } from "../../service/tokenCheck";

// 데이터를 저장할 ref (englishName만 사용)
const rawData = ref<CountryGraphData[]>([
  { englishName: "KOREA, REPUBLIC OF", count: 10 },
  { englishName: "USA", count: 20 },
  { englishName: "JAPAN", count: 30 },
]);

// 라벨과 데이터셋을 computed로 동적 계산 (englishName만 사용)
const labels = computed(() => rawData.value.map((e) => e.englishName));
const dataset = computed(() => rawData.value.map((e) => e.count));

// Chart.js 설정을 computed로 관리
const config = computed<ChartConfiguration>(() => ({
  type: "doughnut",
  data: {
    labels: labels.value, // 라벨 설정 (englishName)
    datasets: [
      {
        fill: false,
        data: dataset.value, // 데이터셋 설정
        backgroundColor: [
          // 배경색상
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          // 경계선 색상
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1, // 경계선 두께
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // 레전드 위치
      },
    },
  },
}));

// API 호출 후 차트 데이터 업데이트
const fetchChartData = async () => {
  const token = await checkAndRedirectToken();
  const data = await getCountryGraph(token);
  if (data) {
    rawData.value = data;
  } else {
    console.error("그래프 데이터 얻기 실패");
  }
};

// 차트 인스턴스 관리
const chartInstance = ref<Chart | null>(null);

onMounted(async () => {
  // API 호출 후 차트 데이터 업데이트
  await fetchChartData();

  // 차트 생성
  const canvasTag = document.getElementById("doughnutChart") as ChartItem;
  chartInstance.value = new Chart(canvasTag, config.value);
});
</script>

<style scoped></style>

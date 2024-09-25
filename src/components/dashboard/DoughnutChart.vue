<template>
  <div class="w-full h-[248px] bg-white p-3 justify-center flex">
    <canvas id="doughnutChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart, { ChartConfiguration, ChartItem } from "chart.js/auto";
import { onMounted } from "vue";

const labels: string[] = ["Red", "Blue", "Yellow"];
const datas: number[] = [300, 50, 100];
const backgroundColors: string[] = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: datas,
      backgroundColor: backgroundColors,
      hoverOffset: 4,
    },
  ],
};
const config: ChartConfiguration = {
  type: "doughnut",
  data: data,
};

onMounted(() => {
  const canvasTag = document.getElementById("doughnutChart") as ChartItem;
  new Chart(canvasTag, config);
});
</script>

<style scoped></style>

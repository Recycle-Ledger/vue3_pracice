<template>
  <div class="w-full h-[248px] bg-white p-3 justify-center flex">
    <canvas id="lineChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart, { ChartConfiguration, ChartItem } from "chart.js/auto";
import { onMounted } from "vue";

const labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "# 1 of Votes",
      data: [1, 19, 1, 5, 2, 3],
      borderWidth: 1,
    },
    {
      label: "# 2 of Votes",
      data: [12, 1, 1, 1, 2, 3],
      borderWidth: 1,
    },
    {
      label: "# 3 of Votes",
      data: [12, 19, 1, 5, 1, 1],
      borderWidth: 1,
    },
  ],
};
const config: ChartConfiguration = {
  type: "line",
  data: data,
  options: {},
};

onMounted(() => {
  const canvasTag = <ChartItem>document.getElementById("lineChart");
  new Chart(canvasTag, config);
});
</script>

<style scoped></style>

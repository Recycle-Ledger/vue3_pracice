<template>
  <div class="w-full h-[248px] bg-white p-3 justify-center flex">
    <canvas id="doughnutChart"></canvas>
  </div>
</template>

<script setup>
import Chart from "chart.js/auto";
import { onMounted } from "vue";

const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
const config = {
  type: "doughnut",
  data: data,
};

onMounted(() => {
  const canvasTag = document.getElementById("doughnutChart");
  new Chart(canvasTag, config);
});
</script>

<style scoped></style>

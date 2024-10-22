<template>
  <div class="bg-white rounded-md flex flex-col w-full min-h-12">
    <div
      class="h-24 py-2 px-4 flex gap-5 w-full justify-between items-center transition-all duration-300 ease-in-out"
      @click="toggleChart"
      :class="{
        'cursor-pointer hover:bg-opacity-50 hover:scale-95': canToggleChart,
        'cursor-default': !canToggleChart,
      }"
    >
      <div
        class="p-4 rounded-md bg-opacity-20"
        :class="[
          bgColor === 'red' ? 'bg-red-500' : '',
          bgColor === 'blue' ? 'bg-blue-500' : '',
          bgColor === 'yellow' ? 'bg-yellow-500' : '',
        ]"
      >
        <component
          :is="iconMap[icon]"
          class="w-8"
          :class="[
            textColor === 'red' ? 'text-red-500' : '',
            textColor === 'blue' ? 'text-blue-500' : '',
            textColor === 'yellow' ? 'text-yellow-500' : '',
          ]"
        />
      </div>

      <div class="flex flex-col w-full">
        <div>
          <p class="text-opacity-50 text-black">{{ t(title) }}</p>
          <p class="text-2xl font-bold">
            {{ formattedValue }}
          </p>
        </div>
      </div>

      <!-- 그래프 아이콘 표시 여부 -->
      <ChartBarIcon
        v-if="canToggleChart"
        class="w-12 h-12"
        :class="[
          textColor === 'red' ? 'text-red-500' : '',
          textColor === 'blue' ? 'text-blue-500' : '',
          textColor === 'yellow' ? 'text-yellow-500' : '',
        ]"
      />
    </div>

    <!-- 차트 렌더링 (토글식) -->
    <div
      v-if="showChart"
      class="w-full transition-all duration-300 ease-in-out"
    >
      <BarChart v-if="chartType === 'BarChart'" />
      <LineChart v-if="chartType === 'LineChart'" />
      <DoughnutChart v-if="chartType === 'DoughnutChart'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { formatNumber } from '../../service/numberFormat';
  import {
    CurrencyDollarIcon,
    HomeModernIcon,
    CheckBadgeIcon,
    ChartBarIcon,
  } from '@heroicons/vue/24/outline';
  import { useI18n } from 'vue-i18n';
  import BarChart from './BarChart.vue';
  import LineChart from './LineChart.vue';
  import DoughnutChart from './DoughnutChart.vue';

  const { t } = useI18n();

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
    needFormat: {
      type: Boolean,
      required: true,
    },
    chartType: {
      type: String,
      required: true,
    },
    isFirstCard: {
      type: Boolean,
      required: true,
    },
  });

  // 차트 토글 상태 관리
  const showChart = ref<boolean>(false);

  // 차트 토글 가능 여부 (완료/취소 포함 여부에 따라)
  const canToggleChart = computed(() => {
    return (
      !props.title.includes('Completed') && !props.title.includes('Rejected')
    );
  });

  // 첫 번째 카드일 때 자동으로 차트 열기
  onMounted(() => {
    if (props.isFirstCard) {
      showChart.value = true;
    }
  });

  // 차트 토글 함수
  const toggleChart = () => {
    if (canToggleChart.value) {
      showChart.value = !showChart.value;
    }
  };

  // Heroicon 컴포넌트 매핑
  const iconMap: Record<string, any> = {
    CurrencyDollarIcon: CurrencyDollarIcon,
    HomeModernIcon: HomeModernIcon,
    CheckBadgeIcon: CheckBadgeIcon,
  };

  // formattedValue를 computed로 정의하여 특정 title에만 포맷 적용 및 'kg' 추가
  const formattedValue = computed(() => {
    if (props.needFormat) {
      return `${formatNumber(props.value)} kg`;
    }
    return props.value.toString();
  });
</script>

<style scoped></style>

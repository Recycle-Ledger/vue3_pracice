<template>
  <div
    class="h-24 bg-white rounded-md py-2 px-4 flex gap-5 w-full justify-center items-center"
  >
    <div
      class="flex-shrink-0 p-4 rounded-md bg-opacity-20"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatNumber } from "../../service/numberFormat";
import {
  CurrencyDollarIcon,
  HomeModernIcon,
  CheckBadgeIcon,
} from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";

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
});

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

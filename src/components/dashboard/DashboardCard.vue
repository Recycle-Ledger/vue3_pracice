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
      <div v-if="typeof value === 'number'">
        <p class="text-opacity-50 text-black">{{ title }}</p>
        <p class="text-2xl font-bold">
          {{ cardValue }}
        </p>
      </div>

      <div v-else class="flex w-full justify-evenly md:justify-start md:gap-5">
        <div class="flex flex-col">
          <p class="text-opacity-50 text-black line-clamp-2">
            {{ t("dashboard.certificationProgress") }}
          </p>
          <p class="text-2xl font-bold">{{ value.inProgress }}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-opacity-50 text-black line-clamp-2">
            {{ t("dashboard.certificationApprove") }}
          </p>
          <p class="text-2xl font-bold">{{ value.approved }}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-opacity-50 text-black line-clamp-2">
            {{ t("dashboard.certificationReject") }}
          </p>
          <p class="text-2xl font-bold">{{ value.reject }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { CertificationData } from "../../service/dashboard/summaryService";
import { formatNumber } from "../../service/numberFormat";
import {
  CurrencyDollarIcon,
  HomeModernIcon,
  CheckBadgeIcon,
} from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const cardValue = computed<string | CertificationData>(() => {
  if (typeof props.value === "number") {
    return formatNumber(props.value) + "kg";
  }
  return props.value;
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, Object] as PropType<number | CertificationData>,
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
});

// Heroicon 컴포넌트 매핑
const iconMap: Record<string, any> = {
  CurrencyDollarIcon: CurrencyDollarIcon,
  HomeModernIcon: HomeModernIcon,
  CheckBadgeIcon: CheckBadgeIcon,
};
</script>

<style scoped></style>

<template>
  <div class="w-full">
    <div class="overflow-x-auto">
      <table class="table-auto min-w-full border border-gray-300">
        <thead class="bg-green-300">
          <tr class="text-center">
            <th class="px-4 py-2">{{ t("ledger.type") }}</th>
            <th class="px-4 py-2">{{ t("ledger.po") }}</th>
            <th class="px-4 py-2">{{ t("ledger.poAddress") }}</th>
            <th class="px-4 py-2">{{ t("ledger.td") }}</th>
            <th class="px-4 py-2">{{ t("ledger.wh") }}</th>
            <th class="px-4 py-2">{{ t("ledger.collectionQuantity") }}</th>
            <th class="px-4 py-2">{{ t("ledger.collectionWeight") }}</th>
            <th class="px-4 py-2">{{ t("ledger.containerWeight") }}</th>
            <th class="px-4 py-2">{{ t("ledger.collectionDate") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="text-center bg-white">
            <td colspan="9">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">{{ t("ledger.loading") }}</span>
              </div>
            </td>
          </tr>
          <tr
            v-for="(item, index) in items"
            :key="index"
            class="text-center border-t border-gray-200 bg-white"
          >
            <td class="px-4 py-2">
              <!-- 유형이 배열일 경우 join()을 사용하여 출력 -->
              <span v-if="Array.isArray(item.type)">{{
                item.type.join(", ")
              }}</span>
              <span v-else>{{ item.type }}</span>
            </td>
            <td class="px-4 py-2">{{ item.poName }}</td>
            <td class="px-4 py-2">{{ item.poStreetAddress }}</td>
            <td class="px-4 py-2">{{ item.tdName }}</td>
            <td class="px-4 py-2">{{ item.whName }}</td>
            <td class="px-4 py-2">{{ formatNumber(item.quantity) }}</td>
            <td class="px-4 py-2">{{ formatNumber(item.weight) }}</td>
            <td class="px-4 py-2">
              {{ item.containerType }} ({{
                formatNumber(item.containerWeight)
              }})
            </td>
            <td class="px-4 py-2">{{ formatDate(item.dischargeDate) }}</td>
          </tr>
          <tr v-if="items.length === 0 && !isLoading" class="text-center">
            <td colspan="9">{{ t("ledger.noData") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 20개 이상일 때만 더 보기 버튼 표시 -->
    <div class="flex justify-center mt-4" v-if="items.length >= 20">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded"
        @click="loadMore"
      >
        {{ t("ledger.loadMore") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { checkAndRedirectToken } from "../../service/tokenCheck";
import { getLedger } from "../../service/dashboard/ledgerService";

const { t } = useI18n();
const items = ref<any[]>([]);
const isLoading = ref(false);
const page = ref(1);

const loadMore = async () => {
  const token = await checkAndRedirectToken();
  const data = await getLedger(token, page.value);
  console.log(data);
  if (data) {
    items.value = [...items.value, ...data.content];
    page.value += 1;
  } else {
    console.error("데이터 로드 실패");
  }
};

// 숫자 형식 포맷팅 함수
const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

// 날짜 형식 포맷팅 함수
const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

// 페이지가 로드되면 처음 데이터를 받아옴
onMounted(async () => {
  loadMore();
});
</script>

<style scoped></style>

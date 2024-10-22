<template>
  <div
    class="w-full min-w-[600px] lg:w-[80dvw] bg-white shadow-lg rounded-lg p-4"
  >
    <div class="overflow-x-auto">
      <table class="table-auto min-w-full border border-gray-300 rounded-lg">
        <thead class="bg-ledgerdarkgreen-100 text-ledgerdarkgreen-500">
          <tr class="text-center">
            <th class="px-3 py-4 text-pretty">{{ t('ledger.type') }}</th>
            <th class="px-3 py-4 text-pretty">{{ t('ledger.po') }}</th>
            <th class="px-3 py-4 text-pretty">{{ t('ledger.poAddress') }}</th>
            <th class="px-3 py-4 text-pretty">{{ t('ledger.td') }}</th>
            <th class="px-3 py-4 text-pretty">{{ t('ledger.wh') }}</th>
            <th class="px-3 py-4 text-pretty">
              {{ t('ledger.collectionQuantity') }}
            </th>
            <th class="px-3 py-4 text-pretty">
              {{ t('ledger.collectionWeight') }}
            </th>
            <th class="px-3 py-4 text-pretty">
              {{ t('ledger.containerWeight') }}
            </th>
            <th class="px-3 py-4 text-pretty">
              {{ t('ledger.collectionDate') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="text-center bg-gray-50">
            <td colspan="9" class="py-6">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">{{ t('ledger.loading') }}</span>
              </div>
            </td>
          </tr>
          <tr
            v-for="(item, index) in items"
            :key="index"
            class="text-center border-t border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
          >
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              <span v-if="Array.isArray(item.type)">
                {{ item.type.join(', ') }}
              </span>
              <span v-else>{{ item.type }}</span>
            </td>
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              {{ item.poName }}
            </td>
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              {{ item.poStreetAddress }}
            </td>
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              {{ item.tdName }}
            </td>
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              {{ item.whName }}
            </td>
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              {{ item.quantity }}
            </td>
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              {{ item.weight }}
            </td>
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              {{ item.containerType }} ({{ item.containerWeight }})
            </td>
            <td class="px-4 py-4 text-pretty text-sm font-medium text-gray-700">
              {{ formatDate(item.dischargeDate) }}
            </td>
          </tr>
          <tr v-if="items.length === 0 && !isLoading" class="text-center">
            <td colspan="9" class="py-6 text-gray-500">
              {{ t('ledger.noData') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 20개 이상일 때만 더 보기 버튼 표시 -->
    <div class="flex justify-center mt-6" v-if="items.length >= 20">
      <button
        class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-150 ease-in-out"
        @click="loadMore"
      >
        {{ t('ledger.loadMore') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { checkAndRedirectToken } from '../../service/tokenCheck';
  import { getLedger } from '../../service/dashboard/ledgerService';

  const { t } = useI18n();
  const items = ref<any[]>([]);
  const isLoading = ref(false);
  const page = ref(1);

  const loadMore = async () => {
    const token = await checkAndRedirectToken();
    const data = await getLedger(token, page.value);
    if (data) {
      items.value = [...items.value, ...data.content];
      page.value += 1;
    } else {
      console.error('데이터 로드 실패');
    }
  };

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString();

  onMounted(async () => {
    loadMore();
  });
</script>

<style scoped></style>

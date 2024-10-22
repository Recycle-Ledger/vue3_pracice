<template>
  <div class="w-full bg-transparent overflow-x-auto">
    <div class="w-[1280px]">
      <table class="table-auto min-w-full rounded-lg shadow-lg">
        <thead class="bg-ledgerdarkgreen-100 text-ledgerdarkgreen-500">
          <tr class="text-center">
            <th></th>
            <th class="px-3 py-4 text-pretty">{{ t('ledger.type') }}</th>
            <th class="px-3 py-4 text-pretty">
              {{ t('ledger.po') }}
            </th>
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
            class="text-center border-t border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out text-pretty text-sm font-medium text-gray-700 bg-white"
          >
            <!-- 타입과 AI 표시 -->
            <td class="px-4 py-4 hover-transform">
              <MagnifyingGlassCircleIcon class="w-6 h-6" />
            </td>
            <td class="px-2 py-4 text-xs font-bold">
              <span class="mx-1 px-2 py-1 text-red-400 bg-red-100 rounded-md">
                {{ item.type }}
              </span>
              <span
                v-if="item.matchYn !== null"
                class="mx-1 px-2 py-1 bg-blue-100 text-blue-500 rounded-md"
                >AI</span
              >
            </td>
            <td class="hover-transform px-4 py-4">
              {{ item.poName }}
            </td>
            <td class="px-4 py-4">
              {{ item.poStreetAddress }}
            </td>
            <td class="hover-transform px-4 py-4">
              {{ item.tdName }}
            </td>
            <td class="px-4 py-4">
              {{ item.whName }}
            </td>
            <td class="px-4 py-4">
              {{ item.quantity }}
            </td>
            <td class="px-4 py-4">
              {{ item.weight }}
            </td>
            <td class="px-4 py-4">
              {{ item.containerType }} ({{ item.containerWeight }})
            </td>
            <td class="px-4 py-4">
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
  import { MagnifyingGlassCircleIcon } from '@heroicons/vue/24/outline';

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

<style>
  .hover-transform {
    @apply transition-transform duration-300 ease-in-out text-blue-600 font-bold cursor-pointer hover:scale-125;
  }
</style>

<template>
  <div class="overflow-x-auto w-full">
    <table
      class="table-auto bg-white border-collapse border border-gray-200"
      :style="isWide ? 'min-width: 1200px;' : 'min-width: 100%;'"
    >
      <thead class="bg-green-300">
        <tr>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Age</th>
          <th class="border px-4 py-2">Email</th>
          <th class="border px-4 py-2">Phone</th>
          <th class="border px-4 py-2">City</th>
          <th class="border px-4 py-2">Country</th>
          <th class="border px-4 py-2">Occupation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td class="border px-4 py-2">{{ row.name }}</td>
          <td class="border px-4 py-2">{{ row.age }}</td>
          <td class="border px-4 py-2">{{ row.email }}</td>
          <td class="border px-4 py-2">{{ row.phone }}</td>
          <td class="border px-4 py-2">{{ row.city }}</td>
          <td class="border px-4 py-2">{{ row.country }}</td>
          <td class="border px-4 py-2">{{ row.occupation }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 화면 크기에 따른 동적 너비 결정
const isWide = ref(window.innerWidth < 1024);

const handleResize = () => {
  isWide.value = window.innerWidth < 1024;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// 예시 데이터
const rows = ref([
  { name: 'Alice', age: 25, email: 'alice@example.com', phone: '123-456-7890', city: 'New York', country: 'USA', occupation: 'Engineer' },
  { name: 'Bob', age: 30, email: 'bob@example.com', phone: '987-654-3210', city: 'Los Angeles', country: 'USA', occupation: 'Designer' },
  { name: 'Charlie', age: 35, email: 'charlie@example.com', phone: '555-666-7777', city: 'Chicago', country: 'USA', occupation: 'Developer' },
  { name: 'David', age: 40, email: 'david@example.com', phone: '444-555-6666', city: 'San Francisco', country: 'USA', occupation: 'Manager' },
  { name: 'Eva', age: 28, email: 'eva@example.com', phone: '222-333-4444', city: 'Boston', country: 'USA', occupation: 'Architect' },
]);
</script>

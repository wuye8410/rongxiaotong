<template>
  <div class="mx-auto px-20 py-8">
    <h2 class="text-2xl font-bold mb-6">我的收藏</h2>

    <!-- 收藏标签切换 -->
    <div class="flex border-b mb-6">
      <button
          class="px-4 py-2 font-medium"
          :class="{ 'text-[#007029] border-b-2 border-[#007029]': activeType === 1 }"
          @click="activeType = 1"
      >
        商品收藏
      </button>
      <button
          class="px-4 py-2 font-medium ml-2"
          :class="{ 'text-[#007029] border-b-2 border-[#007029]': activeType === 2 }"
          @click="activeType = 2"
      >
        知识收藏
      </button>
    </div>

    <!-- 收藏列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="item in collections" :key="item.id" class="border rounded-lg p-4">
        <h3 class="font-medium">{{ item.title }}</h3>
        <p class="text-sm text-gray-500 mt-2">{{ item.content || '点击查看详情' }}</p>
        <div class="flex justify-between items-center mt-4">
          <span class="text-xs text-gray-400">{{ formatTime(item.createTime) }}</span>
          <button
              class="text-red-500 text-sm"
              @click="cancelCollect(item.targetId)"
          >
            取消收藏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { apiClient } from '../api/apiService.js';
import { ElMessage } from 'element-plus';

const activeType = ref(1); // 1-商品 2-知识
const collections = ref([]);

// 加载收藏列表
const loadCollections = async () => {
  try {
    const response = await apiClient.get(`/collect/list/${activeType.value}`, {
      headers: { Authorization: window.localStorage.token }
    });
    collections.value = response.data;
  } catch (error) {
    console.error('加载收藏列表失败', error);
  }
};

// 取消收藏
const cancelCollect = async (targetId) => {
  try {
    const response = await apiClient.delete(`/collect/cancel/${targetId}/${activeType.value}`, {
      headers: { Authorization: window.localStorage.token }
    });
    if (response.flag) {
      ElMessage.success('取消收藏成功');
      loadCollections(); // 重新加载列表
    }
  } catch (error) {
    ElMessage.error('操作失败');
  }
};

// 格式化时间
const formatTime = (time) => {
  return new Date(time).toLocaleDateString();
};

// 监听类型变化重新加载
watch(activeType, loadCollections);
onMounted(loadCollections);
</script>
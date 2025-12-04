<template>
  <div class="my-address">
    <h2>我的地址管理</h2>
    <div class="address-list">
      <!-- 地址列表项 -->
      <div v-for="address in addressList" :key="address.id" class="address-item">
        <div class="address-info">
          <p>{{ address.name }} {{ address.phone }}</p>
          <p>{{ address.province }}{{ address.city }}{{ address.detail }}</p>
          <p v-if="address.isDefault">默认地址</p>
        </div>
        <div class="address-actions">
          <button @click="handleEdit(address.id)">编辑</button>
          <!-- 关键：点击删除时必须正确传递当前地址的id -->
          <button @click="handleDelete(address.id)" class="delete-btn">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 地址列表数据
const addressList = ref([]);

// 获取地址列表
const getAddressList = async () => {
  try {
    const res = await axios.get('/api/address/list');
    addressList.value = res.data.data || [];
  } catch (err) {
    console.error('获取地址列表失败：', err);
  }
};

// 初始化加载地址
onMounted(() => {
  getAddressList();
});

// 删除地址方法（修复：确保接收id参数）
const handleDelete = async (id) => {
  // 关键：先判断id是否存在，避免undefined
  if (!id) {
    console.error('删除失败：地址ID不存在');
    return;
  }

  try {
    // 正确拼接包含id的URL
    await axios.delete(`/api/address/delete/${id}`);
    // 删除成功后重新获取列表
    getAddressList();
    alert('删除成功');
  } catch (err) {
    console.error('删除地址失败：', err);
    alert('删除失败，请重试');
  }
};

// 编辑地址方法（示例）
const handleEdit = (id) => {
  console.log('编辑地址，id：', id);
  // 跳转编辑页面等逻辑
};
</script>

<style scoped>
.my-address {
  padding: 20px;
}

.address-list {
  margin-top: 20px;
}

.address-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 4px;
}

.address-actions button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
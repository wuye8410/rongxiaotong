<template>
  <div class="max-w-2xl mx-auto p-4">
    <!-- 地址列表标题 -->
    <div class="text-xl font-semibold mb-6">我的收货地址</div>

    <!-- 地址列表 -->
    <div v-if="addresses.length > 0" class="space-y-4">
      <div
          v-for="addr in addresses"
          :key="addr.id"
          class="border rounded-lg p-4 flex justify-between items-start"
      >
        <!-- 地址信息 -->
        <div>
          <div class="flex items-center mb-2">
            <span class="font-medium">{{ addr.consignee }}</span>
            <span class="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded" v-if="addr.isDefault">
              默认地址
            </span>
          </div>
          <div class="text-gray-600 mb-1">{{ addr.phone }}</div>
          <div class="text-gray-700">{{ addr.addressDetail }}</div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex space-x-2">
          <button @click="handleEdit(addr)" class="text-blue-600 text-sm">编辑</button>
          <button @click="handleDelete(addr.id)" class="text-red-600 text-sm">删除</button>
        </div>
      </div>
    </div>

    <!-- 空地址提示 -->
    <div v-else class="text-center py-10 text-gray-500">
      暂无收货地址，请添加
    </div>

    <!-- 添加地址按钮 -->
    <div class="mt-6">
      <button
          @click="showAddressForm = true"
          class="w-full py-2 border border-dashed rounded-lg text-gray-600 hover:bg-gray-50 transition"
      >
        <i class="mr-1">+</i> 添加新地址
      </button>
    </div>

    <!-- 地址表单对话框 -->
    <el-dialog
        v-model="showAddressForm"
        :title="currentAddress.id ? '编辑地址' : '添加地址'"
        width="600px"
    >
      <el-form
          :model="currentAddress"
          :rules="addressRules"
          ref="addressFormRef"
          label-width="80px"
      >
        <!-- 收货人 -->
        <el-form-item label="收货人" prop="consignee">
          <el-input
              v-model="currentAddress.consignee"
              placeholder="请输入收货人姓名"
          ></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <!-- 避免number类型导致的科学计数法问题 -->
          <el-input
              v-model="currentAddress.phone"
              placeholder="请输入11位手机号"
              type="text"
          ></el-input>
        </el-form-item>

        <!-- 详细地址 -->
        <el-form-item label="详细地址:" prop="addressDetail">
          <el-input
              v-model="currentAddress.addressDetail"
              placeholder="请输入详细地址"
              rows=3
              type="textarea"
          ></el-input>
        </el-form-item>

        <!-- 是否默认地址 -->
        <el-form-item>
          <el-checkbox v-model="currentAddress.isDefault">设为默认地址</el-checkbox>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showAddressForm = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElCheckbox, ElButton } from 'element-plus';

// 地址列表数据（实际项目中从接口获取）
const addresses = reactive([
  // 示例数据
  // {
  //   id: 1,
  //   consignee: '张三',
  //   phone: '13800138000',
  //   addressDetail: '北京市朝阳区XX街道XX小区1号楼1单元101',
  //   isDefault: true
  // }
]);

// 控制对话框显示
const showAddressForm = ref(false);

// 当前编辑/新增的地址对象
const currentAddress = reactive({
  id: '',
  consignee: '',
  phone: '',
  addressDetail: '',
  isDefault: false
});

// 表单验证规则
const addressRules = {
  consignee: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号', trigger: 'blur' }
  ],
  addressDetail: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ]
};

// 表单引用
const addressFormRef = ref(null);

// 编辑地址
const handleEdit = (addr) => {
  // 深拷贝地址数据到当前编辑对象
  Object.assign(currentAddress, JSON.parse(JSON.stringify(addr)));
  showAddressForm.value = true;
};

// 删除地址
const handleDelete = (id) => {
  const index = addresses.findIndex(addr => addr.id === id);
  if (index !== -1) {
    addresses.splice(index, 1);
  }
};

// 保存地址（新增/编辑）
const handleSave = async () => {
  // 表单验证
  const valid = await addressFormRef.value.validate();
  if (!valid) return;

  if (currentAddress.id) {
    // 编辑：更新现有地址
    const index = addresses.findIndex(addr => addr.id === currentAddress.id);
    if (index !== -1) {
      addresses[index] = { ...currentAddress };
    }
  } else {
    // 新增：添加新地址
    addresses.push({
      ...currentAddress,
      id: Date.now()  // 临时用时间戳作为id，实际项目用接口返回的id
    });
  }

  // 关闭对话框并重置表单
  showAddressForm.value = false;
  addressFormRef.value.resetFields();
  Object.keys(currentAddress).forEach(key => {
    currentAddress[key] = key === 'isDefault' ? false : '';
  });
};
</script>

<style scoped>
/* 可根据需要添加自定义样式 */
</style>
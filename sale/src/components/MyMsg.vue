<template>
  <!-- 主内容区 -->
  <div class="max-w-2xl mx-auto pr-48 py-8">
    <!-- 基本信息 -->
    <div class="space-y-6">
      <!-- 头像上传区域 -->
      <div class="flex justify-center">
        <el-form label-width="80px">
          <el-upload
              ref="uploadRef"
              action="#"
              list-type="picture-card"
              :on-change="handleImageUpload"
              :on-remove="() => { avatar.value = ''; image.value = [] }"
              :auto-upload="false"
              :limit="1"
              :file-list="avatar ? [{
              name: 'avatar',
              url: avatar ? `${$store.state.imgShowRoad}/file/avatar/${avatar}` : '/src/assets/img/default-avatar.png'
            }] : []"
              class="[&_.el-upload-list__item]:!rounded-full [&_.el-upload--picture-card]:!rounded-full"
          >
            <el-icon class="text-2xl"><PlusIcon /></el-icon>
          </el-upload>
          <p class="text-xs text-gray-500 mt-2 text-center">支持JPG、PNG格式，不超过2MB</p>
        </el-form>
      </div>

      <!-- 昵称输入 -->
      <div class="flex items-center">
        <label class="w-20 text-right mr-4 text-gray-600">昵称:</label>
        <input
            type="text"
            v-model="nickname"
            class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            maxlength="20"
            placeholder="请输入昵称"
        />
      </div>

      <!-- 姓名输入 -->
      <div class="flex items-center">
        <label class="w-20 text-right mr-4 text-gray-600">姓名:</label>
        <input
            type="text"
            v-model="name"
            class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            maxlength="10"
            placeholder="请输入真实姓名"
        />
      </div>

      <!-- 手机号输入 -->
      <div class="flex items-center">
        <label class="w-20 text-right mr-4 text-gray-600">手机号:</label>
        <input
            type="tel"
            v-model="phone"
            class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            maxlength="11"
            placeholder="请输入11位手机号"
            @input="phone = phone.replace(/[^\d]/g, '')"
        />
      </div>

      <!-- 身份证输入 -->
      <div class="flex items-center">
        <label class="w-20 text-right mr-4 text-gray-600">身份证:</label>
        <input
            type="text"
            v-model="idCard"
            class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            maxlength="18"
            placeholder="请输入18位身份证号"
            @input="idCard = idCard.replace(/[^\dXx]/g, '').toUpperCase()"
        />
      </div>

      <!-- 地址输入 -->
      <div class="flex items-center">
        <label class="w-20 text-right mr-4 text-gray-600">地址:</label>
        <input
            type="text"
            v-model="address"
            class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            maxlength="100"
            placeholder="请输入详细地址"
        />
      </div>

      <!-- 保存按钮 -->
      <div class="flex justify-center mt-8">
        <button
            @click="saveProfile"
            :disabled="isSaving"
            class="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-12 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <template v-if="isSaving">保存中...</template>
          <template v-else>保存</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiClient } from "../api/apiService.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { PlusIcon } from "lucide-vue-next";

const store = useStore();
const router = useRouter();

// 基本信息表单数据
const userName = ref("");
const nickname = ref("");
const name = ref("");
const phone = ref("");
const idCard = ref("");
const address = ref("");
const avatar = ref("");

// 上传相关状态
const image = ref([]);
const imageDB = ref("");
const isSaving = ref(false); // 保存状态控制

// 初始化加载个人信息
onMounted(async () => {
  try {
    await selectPersMsg();
  } catch (error) {
    ElMessage.error("加载个人信息失败，请刷新页面重试");
  }
});

// 处理图片上传
const handleImageUpload = (file) => {
  // 验证文件类型
  const isImage = file.raw.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error("请上传图片文件（JPG/PNG）");
    return;
  }

  // 验证文件大小（2MB）
  const maxSize = 2 * 1024 * 1024;
  if (file.raw.size > maxSize) {
    ElMessage.error("图片大小不能超过2MB");
    return;
  }

  image.value = [file];
};

// 保存个人信息
const saveProfile = async () => {
  // 表单验证
  if (!nickname.value.trim()) {
    ElMessage.warning("请输入昵称");
    return;
  }
  if (!name.value.trim()) {
    ElMessage.warning("请输入真实姓名");
    return;
  }
  if (phone.value && !/^1[3-9]\d{9}$/.test(phone.value)) {
    ElMessage.warning("请输入有效的手机号");
    return;
  }
  if (idCard.value && !/^\d{17}[\dX]$/.test(idCard.value)) {
    ElMessage.warning("请输入有效的身份证号");
    return;
  }

  isSaving.value = true;
  try {
    // 上传头像（如有新图片）
    if (image.value.length > 0) {
      const formData = new FormData();
      formData.append("file", image.value[0].raw);

      const uploadRes = await apiClient.post(
          `${store.state.fileUploadRoad}/file/upload/avatar`,
          formData,
          {
            headers: {
              Authorization: window.localStorage.token,
              "Content-Type": "multipart/form-data",
            },
          }
      );

      if (!uploadRes.flag) {
        ElMessage.error("头像上传失败，请重试");
        return;
      }
      imageDB.value = uploadRes.data.split("/")[1];
    } else {
      // 无新图片则沿用原头像
      imageDB.value = avatar.value;
    }

    // 提交个人信息
    const param = {
      realName: name.value.trim(),
      nickName: nickname.value.trim(),
      phone: phone.value.trim(),
      identityNum: idCard.value.trim(),
      address: address.value.trim(),
      avatar: imageDB.value,
    };

    const updateRes = await apiClient.post(
        "/user/loginUpdateByUsername",
        param,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: window.localStorage.token,
          },
        }
    );

    if (updateRes.flag) {
      ElMessage.success("个人信息修改成功");
      // 刷新页面数据
      await selectPersMsg();
    } else {
      ElMessage.error(`修改失败：${updateRes.msg || '未知错误'}`);
    }
  } catch (error) {
    console.error("保存信息失败：", error);
    ElMessage.error("网络异常，请稍后重试");
  } finally {
    isSaving.value = false;
  }
};

// 查询个人信息
const selectPersMsg = async () => {
  try {
    const response = await apiClient.get("/user/loginSelectByUsername", {
      headers: {
        Authorization: window.localStorage.token,
      },
    });

    if (response.flag) {
      const data = response.data;
      userName.value = data.userName || "";
      nickname.value = data.nickName || "";
      name.value = data.realName || "";
      phone.value = data.phone || "";
      idCard.value = data.identityNum || "";
      address.value = data.address || "";
      avatar.value = data.avatar || "";
    } else {
      ElMessage.error(`获取信息失败：${response.msg || '未知错误'}`);
    }
  } catch (error) {
    console.error("查询个人信息接口异常：", error);
    throw error;
  }
};
</script>

<style scoped>
/* 头像样式优化 */
:deep(.el-upload-list__item-thumbnail),
:deep(.el-upload-list__item img),
:deep(.el-upload-list__item) {
  border-radius: 50% !important;
  object-fit: cover;
  border: none !important;
}

/* 上传按钮hover样式 */
:deep(.el-upload--picture-card:hover) {
  background-color: #f0fdf4 !important;
  border-color: #22c55e !important;
}
</style>
<template>
  <section class="py-12 bg-white border-t-2 border-gray-300">
    <div class="container w-2/3 mx-auto">
      <!-- Back Button -->
      <div class="mb-6">
        <button
            class="flex items-center text-gray-500 hover:text-gray-700"
            @click="goBack"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
            />
          </svg>
          返回
        </button>
      </div>
      <div class="bg-white px-4 py-4">
        <!-- Header Section -->
        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        >
          <div class="flex items-center mb-4 md:mb-0">
            <!-- Bank Logo -->
            <div class="mr-20">
              <img :src="bankicon" class="h-12 bank-logo-img" />
            </div>

            <!-- Product Name -->
            <div>
              <div class="flex items-center">
                <h1 class="text-xl font-medium mr-6">{{ bankname }}</h1>
                <div class="flex">
                  <span
                      class="bg-[#007029] text-white text-xs px-2 py-1 rounded mr-2"
                  >在线申请</span
                  >
                  <span
                      class="bg-[#007029] text-white text-xs px-2 py-1 rounded mr-2"
                  >特快审批</span
                  >
                  <span
                      class="bg-[#007029] text-white text-xs px-2 py-1 rounded"
                  >便捷</span
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button
                class="bg-[#007029] text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                @click="personalLoan()"
            >
              个人贷款
            </button>
            <button
                class="bg-[#007029] text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                @click="combinationLoan()"
            >
              组合贷款
            </button>
          </div>
        </div>

        <!-- Product Description -->
        <div class="mb-8 text-sm leading-relaxed text-gray-700">
          <p>{{ bankintro }}</p>
        </div>
        <div class="border-t border-dashed border-gray-300 pt-4 mb-4"></div>
        <!-- Key Features -->
        <div class="grid grid-cols-4 gap-4 mb-10">
          <!-- Loan Amount -->
          <div class="text-left">
            <div class="flex items-baseline">
              <span class="text-[#007029] font-medium">最高</span>
              <span class="text-[#007029] text-3xl font-bold mx-1">{{ bankmoney }}</span>
              <span class="text-[#007029]">元</span>
            </div>
            <div class="flex items-baseline text-sm text-gray-500 mt-1 ml-6">贷款额度</div>
          </div>

          <!-- Interest Rate -->
          <div class="text-center">
            <div class="flex items-baseline justify-center">
              <span class="text-[#007029] text-3xl font-bold">{{ bankrate }}%</span>
              <span class="text-[#007029] text-sm">起</span>
            </div>
            <div class="text-sm text-gray-500 mt-1">产品利率</div>
          </div>

          <!-- Loan Term -->
          <div class="text-center">
            <div class="flex items-baseline justify-center">
              <span class="text-[#007029]">最长</span>
              <span class="text-[#007029] text-3xl font-bold mx-1">{{ bankrepay }}</span>
              <span class="text-[#007029]">月</span>
            </div>
            <div class="text-sm text-gray-500 mt-1">贷款期限</div>
          </div>
        </div>

        <!-- Additional Features -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div class="flex flex-col">
            <div class="text-sm text-gray-700">最快放款2-3日</div>
          </div>
          <div class="flex flex-col">
            <div class="text-sm text-gray-700">担保方式:信用</div>
          </div>
          <div class="flex flex-col">
            <div class="text-sm text-gray-700">还款方式:到期还本付息</div>
          </div>
          <div class="flex flex-col">
            <div class="text-sm text-gray-700">适用范围:覆盖全国</div>
          </div>
          <div class="flex flex-col">
            <div class="text-sm text-gray-700">所属机构:中国农业银行</div>
          </div>
        </div>
      </div>
      <!-- Product Characteristics -->
      <div class="bg-white px-4 py-4">
        <div class="mb-8">
          <h2 class="text-lg font-medium mb-4 pb-2 border-b-2 border-[#007029] inline-block">产品特色</h2>
          <p class="text-sm leading-relaxed text-gray-700">{{ bankintro }}</p>
        </div>

        <!-- Eligibility Requirements -->
        <div class="mb-8">
          <h2 class="text-lg font-medium mb-4 pb-2 border-b-2 border-[#007029] inline-block">准入条件</h2>
          <p class="text-sm leading-relaxed text-gray-700">年龄要求：18-65周岁（学生贷、养老金贷等产品可能有特殊年龄限制）</p>
          <p class="text-sm leading-relaxed text-gray-700">身份证明：有效身份证、护照+居留许可</p>
          <p class="text-sm leading-relaxed text-gray-700">民事行为能力：无刑事犯罪记录、非失信被执行人</p>
        </div>

        <!-- Application Materials -->
        <div class="mb-8">
          <h2 class="text-lg font-medium mb-4 pb-2 border-b-2 border-[#007029] inline-block">申请所需材料</h2>
          <p class="text-sm leading-relaxed text-gray-700 mb-4">征信记录、收入证明、负债比例</p>
        </div>
      </div>
    </div>

    <!-- 个人贷款模态框 -->
    <div v-if="showLoanModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-1/2 max-w-2xl">
        <div class="p-4 border-b">
          <h3 class="text-lg font-bold">个人贷款申请</h3>
        </div>
        <ElForm
            ref="loanFormRef"
            :model="loanForm"
            :rules="loanValidationRules"
            class="p-6 grid grid-cols-3 gap-4"
        >
          <ElFormItem prop="name" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">姓名</label>
            <ElInput v-model="loanForm.name" class="border rounded p-2" />
          </ElFormItem>
          <ElFormItem prop="amount" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">贷款额度（万元）</label>
            <ElInput v-model="loanForm.amount" class="border rounded p-2" />
          </ElFormItem>
          <ElFormItem prop="rate" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">贷款利率</label>
            <ElInput v-model="loanForm.rate" class="border rounded p-2" />
          </ElFormItem>
          <ElFormItem prop="term" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">贷款周期（月）</label>
            <ElInput v-model="loanForm.term" class="border rounded p-2" />
          </ElFormItem>
          <ElFormItem prop="contact" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">联系方式</label>
            <ElInput v-model="loanForm.contact" class="border rounded p-2" />
          </ElFormItem>
          <ElFormItem prop="idNumber" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">身份证号</label>
            <ElInput v-model="loanForm.idNumber" class="border rounded p-2" />
          </ElFormItem>
          <div class="col-span-2">
            <label class="text-gray-500 text-sm mb-1">上传资料</label>
            <input
                type="file"
                multiple
                @change="handlePersonalFileUpload"
                class="border rounded p-2 w-full"
                accept="image/*"
                :disabled="personalUploadLoading"
            />
            <div v-if="personalUploadLoading" class="text-xs text-gray-500 mt-1">上传中...</div>
            <div v-if="personalAllFiles.length > 0" class="mt-2">
              <div class="text-xs text-gray-500 mb-1">已选择文件:</div>
              <div class="flex flex-wrap gap-2">
                <span
                    v-for="(file, index) in personalAllFiles"
                    :key="index"
                    class="bg-gray-100 px-2 py-1 rounded text-xs"
                >
                  {{ file.name }}
                </span>
              </div>
            </div>
          </div>
        </ElForm>
        <div class="p-4 border-t flex justify-end space-x-4">
          <button
              class="px-4 py-2 text-gray-500 hover:text-gray-700"
              @click="resetPersonalLoanForm"
          >
            取消
          </button>
          <button
              class="px-4 py-2 bg-[#007029] text-white rounded hover:bg-green-600"
              @click="submitLoanApplication"
              :disabled="personalUploadLoading"
          >
            申请
          </button>
        </div>
      </div>
    </div>

    <!-- 组合贷款模态框 -->
    <div v-if="showCombinationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-1/2 max-w-2xl">
        <div class="p-4 border-b">
          <h3 class="text-lg font-bold">组合贷款申请</h3>
        </div>
        <ElForm
            ref="combinationFormRef"
            :model="combinationForm"
            :rules="combinationValidationRules"
            class="p-6 grid grid-cols-3 gap-4"
        >
          <ElFormItem prop="amount" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">贷款额度（万元）</label>
            <ElInput v-model="combinationForm.amount" class="border rounded p-2" />
          </ElFormItem>
          <ElFormItem prop="rate" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">贷款利率</label>
            <ElInput v-model="combinationForm.rate" class="border rounded p-2" />
          </ElFormItem>
          <ElFormItem prop="term" class="flex flex-col">
            <label class="text-gray-500 text-sm mb-1">贷款周期（月）</label>
            <ElInput v-model="combinationForm.term" class="border rounded p-2" />
          </ElFormItem>

          <div class="col-span-3">
            <h4 class="text-md font-medium mb-2">贷款人1</h4>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <ElFormItem prop="realName" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">姓名</label>
                <ElInput v-model="combinationForm.realName" class="border rounded p-2" />
              </ElFormItem>
              <ElFormItem prop="phone" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">联系方式</label>
                <ElInput v-model="combinationForm.phone" class="border rounded p-2" />
              </ElFormItem>
              <ElFormItem prop="idNum" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">身份证号</label>
                <ElInput v-model="combinationForm.idNum" class="border rounded p-2" />
              </ElFormItem>
            </div>

            <h4 class="text-md font-medium mb-2">贷款人2（可选）</h4>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <ElFormItem prop="combinationName1" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">姓名</label>
                <ElInput v-model="combinationForm.combinationName1" class="border rounded p-2" />
              </ElFormItem>
              <ElFormItem prop="combinationPhone1" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">联系方式</label>
                <ElInput v-model="combinationForm.combinationPhone1" class="border rounded p-2" />
              </ElFormItem>
              <ElFormItem prop="combinationIdNumber1" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">身份证号</label>
                <ElInput v-model="combinationForm.combinationIdNumber1" class="border rounded p-2" />
              </ElFormItem>
            </div>

            <h4 class="text-md font-medium mb-2">贷款人3（可选）</h4>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <ElFormItem prop="combinationName2" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">姓名</label>
                <ElInput v-model="combinationForm.combinationName2" class="border rounded p-2" />
              </ElFormItem>
              <ElFormItem prop="combinationPhone2" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">联系方式</label>
                <ElInput v-model="combinationForm.combinationPhone2" class="border rounded p-2" />
              </ElFormItem>
              <ElFormItem prop="combinationIdNumber2" class="flex flex-col">
                <label class="text-gray-500 text-sm mb-1">身份证号</label>
                <ElInput v-model="combinationForm.combinationIdNumber2" class="border rounded p-2" />
              </ElFormItem>
            </div>
          </div>

          <div class="col-span-2">
            <label class="text-gray-500 text-sm mb-1">上传资料</label>
            <input
                type="file"
                multiple
                @change="handleCombinationFileUpload"
                class="border rounded p-2 w-full"
                accept="image/*"
                :disabled="combinationUploadLoading"
            />
            <div v-if="combinationUploadLoading" class="text-xs text-gray-500 mt-1">上传中...</div>
            <div v-if="combinationAllFiles.length > 0" class="mt-2">
              <div class="text-xs text-gray-500 mb-1">已选择文件:</div>
              <div class="flex flex-wrap gap-2">
                <span
                    v-for="(file, index) in combinationAllFiles"
                    :key="index"
                    class="bg-gray-100 px-2 py-1 rounded text-xs"
                >
                  {{ file.name }}
                </span>
              </div>
            </div>
          </div>
        </ElForm>
        <div class="p-4 border-t flex justify-end space-x-4">
          <button
              class="px-4 py-2 text-gray-500 hover:text-gray-700"
              @click="resetCombinationLoanForm"
          >
            取消
          </button>
          <button
              class="px-4 py-2 bg-[#007029] text-white rounded hover:bg-green-600"
              @click="submitCombinationLoan"
              :disabled="combinationUploadLoading"
          >
            申请
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/*import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { apiClient } from "../api/apiService.js";
import { useStore } from "vuex";
import { ElForm, ElFormItem, ElInput } from "element-plus";
import { validatePhone, validateIdCard, validatePositiveNumber } from "@/utils/validator";
import bank01 from "@/assets/img/zgnyyh.png";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus)
const route = useRoute();
const router = useRouter();
const store = useStore();*/
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted, createApp } from "vue"; // 补充导入 createApp（如果需要，但实际这里用不到）
import { ElMessage } from "element-plus";
import { apiClient } from "../api/apiService.js";
import { useStore } from "vuex";
import { ElForm, ElFormItem, ElInput } from "element-plus"; // 恢复组件导入
import { validatePhone, validateIdCard, validatePositiveNumber } from "@/utils/validator";
import bank01 from "@/assets/img/zgnyyh.png";

// 银行信息
let bankId = ref();
let bankicon = ref();
let bankname = ref();
let bankintro = ref();
let bankmoney = ref();
let bankrate = ref();
let bankrepay = ref();

// 模态框状态
const showLoanModal = ref(false);
const showCombinationModal = ref(false);

// 个人贷款表单
const loanForm = ref({
  name: '',
  amount: '',
  rate: '',
  term: '',
  contact: '',
  idNumber: '',
  files: []
});
const loanFormRef = ref(null);
const personalAllFiles = ref([]);
const personalDBFiles = ref([]);
const personalUploadLoading = ref(false);

// 组合贷款表单
const combinationForm = ref({
  amount: '',
  rate: '',
  term: '',
  realName: '',
  phone: '',
  idNum: '',
  combinationName1: '',
  combinationPhone1: '',
  combinationIdNumber1: '',
  combinationName2: '',
  combinationPhone2: '',
  combinationIdNumber2: '',
  files: []
});
const combinationFormRef = ref(null);
const combinationAllFiles = ref([]);
const combinationDBFiles = ref([]);
const combinationUploadLoading = ref(false);

// 验证规则
const loanValidationRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在2-20个字符', trigger: 'blur' }
  ],
  amount: [
    { required: true, message: '请输入贷款额度', trigger: 'blur' },
    { validator: validatePositiveNumber, message: '请输入有效金额', trigger: 'blur' }
  ],
  rate: [
    { required: true, message: '请输入贷款利率', trigger: 'blur' },
    { validator: validatePositiveNumber, message: '请输入有效利率', trigger: 'blur' }
  ],
  term: [
    { required: true, message: '请输入贷款周期', trigger: ['blur', 'change'] },
    {
      validator: (rule, value, callback) => {
        const num = Number(value);
        if (isNaN(num) || num < 1) {
          callback(new Error('贷款周期至少1个月'));
        } else {
          callback();
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  contact: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { validator: validatePhone, message: '手机号格式不正确', trigger: 'blur' }
  ],
  idNumber: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { validator: validateIdCard, message: '身份证号格式不正确', trigger: 'blur' }
  ]
};

const combinationValidationRules = {
  amount: loanValidationRules.amount,
  rate: loanValidationRules.rate,
  term: loanValidationRules.term,
  realName: loanValidationRules.name,
  phone: loanValidationRules.contact,
  idNum: loanValidationRules.idNumber,
  // 次要贷款人验证（可选填，但填写时需验证格式）
  combinationPhone1: [
    { validator: validatePhone, message: '手机号格式不正确', trigger: 'blur' }
  ],
  combinationIdNumber1: [
    { validator: validateIdCard, message: '身份证号格式不正确', trigger: 'blur' }
  ],
  combinationPhone2: [
    { validator: validatePhone, message: '手机号格式不正确', trigger: 'blur' }
  ],
  combinationIdNumber2: [
    { validator: validateIdCard, message: '身份证号格式不正确', trigger: 'blur' }
  ]
};

onMounted(async () => {
  bankId.value = route.query.bankId;
  bankicon.value = route.query.bankicon;
  bankname.value = route.query.bankname;
  bankintro.value = route.query.bankintro;
  bankmoney.value = route.query.bankmoney;
  bankrate.value = route.query.bankrate;
  bankrepay.value = route.query.bankrepay;
});

const goBack = () => {
  router.back();
};

const personalLoan = () => {
  if (!window.localStorage.token) {
    ElMessage.error("您未登录，请先登录");
  } else {
    showLoanModal.value = true;
  }
};

const combinationLoan = () => {
  if (!window.localStorage.token) {
    ElMessage.error("您未登录，请先登录");
  } else {
    showCombinationModal.value = true;
  }
};

// 通用文件上传函数
const uploadFiles = async (files, uploadLoadingRef, dbFilesRef, type) => {
  uploadLoadingRef.value = true;
  try {
    if (!files || files.length === 0) {
      ElMessage.warning("请选择要上传的文件");
      return [];
    }

    const baseUrl = store.state.fileUploadRoad;
    if (!baseUrl) {
      throw new Error("上传基础路径未配置");
    }

    const token = window.localStorage.token;
    if (!token) {
      throw new Error("未登录，请先登录");
    }

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      /*const response = await apiClient.post(
          `${baseUrl}/uploadInfo/${type}`,
          formData,
          {
            headers: { Authorization: token },
            onUploadProgress: (progressEvent) => {
              const progress = (progressEvent.loaded / progressEvent.total) * 100;
              console.log(`文件 ${file.name} 上传进度：${progress.toFixed(2)}%`);
            },
          }
      );*/
      const response = await apiClient.post(
          `/file/uploadInfo/${type}`,  // 直接使用正确的相对路径
          formData,
          {
            headers: { Authorization: token },
            onUploadProgress: (progressEvent) => {
              const progress = (progressEvent.loaded / progressEvent.total) * 100;
              console.log(`文件 ${file.name} 上传进度：${progress.toFixed(2)}%`);
            },
          }
      );

      const resData = response.data;
      if (!resData) throw new Error("后端未返回有效数据");
      if (!resData.flag) throw new Error(resData.message || "文件上传失败");
      if (typeof resData.data !== "string") throw new Error("文件路径格式异常");

      return resData.data.split("/")[1];
    });

    const results = await Promise.all(uploadPromises);
    dbFilesRef.value = [...dbFilesRef.value, ...results];
    ElMessage.success("文件上传成功");
    return results;
  } catch (error) {
    const errorMsg = error.response
        ? `[${error.response.status}] ${error.message}`
        : error.message;
    ElMessage.error(`文件上传失败: ${errorMsg}`);
    return [];
  } finally {
    uploadLoadingRef.value = false;
  }
};

// 个人贷款文件上传
const handlePersonalFileUpload = async (event) => {
  const files = Array.from(event.target.files);
  personalAllFiles.value = files;
  await uploadFiles(files, personalUploadLoading, personalDBFiles, 'personal');
  // 清空input值，允许重复选择同一文件
  event.target.value = '';
};

// 组合贷款文件上传
const handleCombinationFileUpload = async (event) => {
  const files = Array.from(event.target.files);
  combinationAllFiles.value = files;
  await uploadFiles(files, combinationUploadLoading, combinationDBFiles, 'combination');
  // 清空input值，允许重复选择同一文件
  event.target.value = '';
};

// 重置个人贷款表单
const resetPersonalLoanForm = () => {
  showLoanModal.value = false;
  loanForm.value = {
    name: '',
    amount: '',
    rate: '',
    term: '',
    contact: '',
    idNumber: '',
    files: []
  };
  personalAllFiles.value = [];
  personalDBFiles.value = [];
  if (loanFormRef.value) loanFormRef.value.resetFields();
};

// 重置组合贷款表单
const resetCombinationLoanForm = () => {
  showCombinationModal.value = false;
  combinationForm.value = {
    amount: '',
    rate: '',
    term: '',
    realName: '',
    phone: '',
    idNum: '',
    combinationName1: '',
    combinationPhone1: '',
    combinationIdNumber1: '',
    combinationName2: '',
    combinationPhone2: '',
    combinationIdNumber2: '',
    files: []
  };
  combinationAllFiles.value = [];
  combinationDBFiles.value = [];
  if (combinationFormRef.value) combinationFormRef.value.resetFields();
};

// 测试文件上传方法
/*const testFileUpload = async (file, type = 'personal') => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const [response] = await Promise.all([
      apiClient.post(
          `/file/uploadInfo/${type}`,
          formData,
          {
            headers: {
              Authorization: window.localStorage.token
            },
            onUploadProgress: (e) => {
              const progress = (e.loaded / e.total) * 100;
              console.log(`上传进度：${progress.toFixed(2)}%`);
            }
          }
      )
    ]);

    console.log("后端完整响应：", response);
    console.log("响应状态码：", response.status);
    console.log("响应体：", response.data);

    const resData = response.data;
    if (!resData) {
      throw new Error("后端未返回有效数据（响应体为空）");
    }

    return resData;
  } catch (error) {
    console.error("文件上传测试失败：", error);
    throw error;
  }
};*/

// 个人贷款提交
const submitLoanApplication = async () => {
  try {
    await loanFormRef.value.validate();
  } catch (error) {
    ElMessage.error("表单填写有误，请检查后重试！");
    return;
  }

  if (personalDBFiles.value.length === 0) {
    ElMessage.error("请上传至少一个文件");
    return;
  }

  const param = {
    bankId: bankId.value,
    realName: loanForm.value.name,
    money: loanForm.value.amount,
    rate: loanForm.value.rate,
    repayment: loanForm.value.term,
    phone: loanForm.value.contact,
    idNum: loanForm.value.idNumber,
    fileInfo: personalDBFiles.value.join(';'),
  };

  try {
    const response = await apiClient.post(`/finance/add`, param, {
      headers: { Authorization: window.localStorage.token },
    });
    if (response.data?.flag) {
      ElMessage.success("贷款申请已提交");
      resetPersonalLoanForm();
    } else {
      ElMessage.error("贷款申请提交失败：" + (response.data?.message || "未知错误"));
    }
  } catch (e) {
    ElMessage.error("提交失败，请检查网络或重新登录");
  }
};

// 组合贷款提交
const submitCombinationLoan = async () => {
  try {
    await combinationFormRef.value.validate();
  } catch (error) {
    ElMessage.error("表单填写有误，请检查后重试！");
    return;
  }

  if (combinationDBFiles.value.length === 0) {
    ElMessage.error("请上传至少一个文件");
    return;
  }

  const param = {
    bankId: bankId.value,
    // 主贷款人信息
    realName: combinationForm.value.realName,
    phone: combinationForm.value.phone,
    idNum: combinationForm.value.idNum,
    // 贷款信息
    money: combinationForm.value.amount,
    rate: combinationForm.value.rate,
    repayment: combinationForm.value.term,
    // 组合贷款人信息
    combinationName1: combinationForm.value.combinationName1,
    combinationPhone1: combinationForm.value.combinationPhone1,
    combinationIdnum1: combinationForm.value.combinationIdNumber1,
    combinationName2: combinationForm.value.combinationName2,
    combinationPhone2: combinationForm.value.combinationPhone2,
    combinationIdnum2: combinationForm.value.combinationIdNumber2,
    // 文件信息
    fileInfo: combinationDBFiles.value.join(';'),
  };

  try {
    const response = await apiClient.post(`/finance/combination/add`, param, {
      headers: { Authorization: window.localStorage.token },
    });
    if (response.data?.flag) {
      ElMessage.success("组合贷款申请已提交");
      resetCombinationLoanForm();
    } else {
      ElMessage.error("申请提交失败：" + (response.data?.message || "未知错误"));
    }
  } catch (e) {
    ElMessage.error("提交失败，请检查网络或重新登录");
  }
};
</script>
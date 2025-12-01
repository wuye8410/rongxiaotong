// 地址验证（非空且至少5个字符，若可选则去掉!value的判断）
export const validateAddress = (rule, value, callback) => {
    // 若地址为必填项：先判断非空，再校验长度
    if (!value) {
        return callback(new Error("地址不能为空"));
    }
    // 去除首尾空格后校验（避免纯空格被误认为有效）
    if (value.trim().length >= 5) {
        callback();
    } else {
        callback(new Error("地址至少5个字符（不含首尾空格）"));
    }
};
// 新增身份证号验证规则（18位，支持最后一位为X/x）
export const validateIdCard = (rule, value, callback) => {
    const reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (value && reg.test(value)) {
        callback(); // 验证通过
    } else {
        callback(new Error("请输入有效的18位身份证号")); // 验证失败提示
    }
};

// 保留之前的其他验证函数（如已存在）
export const validateAddress = (rule, value, callback) => {
    // ... 之前的地址验证逻辑
};

export const validatePurpose = (rule, value, callback) => {
    // ... 之前的贷款用途验证逻辑
};
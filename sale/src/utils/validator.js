/**
 * 通用工具函数：验证身份证号（18位，含校验码）
 * @param {string} idCard - 身份证号字符串
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkIdCard = (idCard) => {
    if (!idCard) return false;
    // 基本格式校验（6位地址码 + 8位生日(1900-2099) + 3位顺序码 + 1位校验码）
    const reg = /^\d{6}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
    if (!reg.test(idCard)) return false;

    // 校验码验证（更严格的校验）
    const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const parityBits = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
    for (let i = 0; i < 17; i++) {
        sum += parseInt(idCard[i], 10) * factors[i];
    }
    const checkBit = parityBits[sum % 11];
    return checkBit.toUpperCase() === idCard[17].toUpperCase();
};

/**
 * 通用工具函数：验证手机号（中国大陆）
 * @param {string} phone - 手机号字符串
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkPhone = (phone) => {
    if (!phone) return false;
    // 11位数字，以1开头，第二位为3-9（覆盖最新号段）
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(phone);
};

/**
 * 通用工具函数：验证金额（正数，最多两位小数）
 * @param {string|number} amount - 金额
 * @param {number} min - 最小金额（默认0）
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkAmount = (amount, min = 0) => {
    if (amount === undefined || amount === null) return false;
    // 转换为字符串处理（避免数字精度问题）
    const str = String(amount).trim();
    // 匹配正数，支持整数或最多两位小数（如：100、100.0、100.00）
    const reg = /^\d+(\.\d{1,2})?$/;
    if (!reg.test(str)) return false;
    // 验证最小值
    return Number(str) >= min;
};

/**
 * 通用工具函数：验证正数（大于0的数字，支持整数和小数）
 * @param {string|number} value - 待验证的值
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkPositiveNumber = (value) => {
    if (!value) return false;
    // 处理利率中的 % 符号（先移除再校验）
    const pureValue = String(value).replace(/%/g, '').trim();
    // 匹配正整数或正小数（允许0开头的小数，如0.01）
    const reg = /^[+]?(\d+(\.\d*)?|\.\d+)$/;
    return reg.test(pureValue) && Number(pureValue) > 0;
};

/**
 * 通用工具函数：验证姓名（中文为主，支持少数英文）
 * @param {string} name - 姓名
 * @param {number} min - 最小长度（默认2）
 * @param {number} max - 最大长度（默认20）
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkName = (name, min = 2, max = 20) => {
    if (!name) return false;
    const trimmed = name.trim();
    // 中文、英文、空格、·（中间点）
    const reg = /^[\u4e00-\u9fa5a-zA-Z·\s]+$/;
    if (!reg.test(trimmed)) return false;
    return trimmed.length >= min && trimmed.length <= max;
};

/**
 * 通用工具函数：验证日期格式（YYYY-MM-DD）
 * @param {string} date - 日期字符串
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkDate = (date) => {
    if (!date) return false;
    const reg = /^\d{4}-\d{2}-\d{2}$/;
    if (!reg.test(date)) return false;
    // 验证实际日期有效性（避免2月30日等无效日期）
    const [year, month, day] = date.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
};

/**
 * 通用工具函数：验证邮箱格式
 * @param {string} email - 邮箱字符串
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkEmail = (email) => {
    if (!email) return false;
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return reg.test(email);
};

/**
 * 通用工具函数：验证地址（非空且长度适中）
 * @param {string} address - 地址字符串
 * @param {number} min - 最小长度（默认5）
 * @param {number} max - 最大长度（默认100）
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkAddress = (address, min = 5, max = 100) => {
    if (!address) return false;
    const trimmed = address.trim();
    return trimmed.length >= min && trimmed.length <= max;
};

/**
 * 通用工具函数：验证贷款用途（非空且合理长度）
 * @param {string} purpose - 用途描述
 * @param {number} min - 最小长度（默认2）
 * @param {number} max - 最大长度（默认200）
 * @returns {boolean} 验证通过返回true，否则返回false
 */
const checkPurpose = (purpose, min = 2, max = 200) => {
    if (!purpose) return false;
    const trimmed = purpose.trim();
    return trimmed.length >= min && trimmed.length <= max;
};


// ------------------------------
// 以下为 Element Plus 表单验证器（适配表单规则）
// ------------------------------

/**
 * Element Plus 表单验证器：身份证号（18位）
 * @param {Object} rule - 表单规则
 * @param {string} value - 输入值
 * @param {Function} callback - 回调函数
 */
export const validateIdCard = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入身份证号'));
    }
    if (checkIdCard(value)) {
        callback(); // 验证通过
    } else {
        callback(new Error('身份证号格式不正确（需18位有效号码）'));
    }
};

/**
 * Element Plus 表单验证器：手机号（中国大陆）
 * @param {Object} rule - 表单规则
 * @param {string} value - 输入值
 * @param {Function} callback - 回调函数
 */
export const validatePhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入手机号'));
    }
    if (checkPhone(value)) {
        callback(); // 验证通过
    } else {
        callback(new Error('手机号格式不正确（需11位有效号码）'));
    }
};

/**
 * Element Plus 表单验证器：金额（正数，最多两位小数）
 * @param {Object} rule - 表单规则
 * @param {string|number} value - 输入值
 * @param {Function} callback - 回调函数
 * @param {number} min - 最小金额（默认0）
 */
export const validateAmount = (rule, value, callback, min = 0) => {
    if (!value) {
        return callback(new Error('请输入金额'));
    }
    if (checkAmount(value, min)) {
        callback(); // 验证通过
    } else {
        callback(new Error(`请输入有效金额（正数，最多两位小数，不小于${min}）`));
    }
};

/**
 * Element Plus 表单验证器：正数（大于0的数字，支持整数和小数）
 * @param {Object} rule - 表单规则
 * @param {string|number} value - 输入值
 * @param {Function} callback - 回调函数
 */
export const validatePositiveNumber = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入内容'));
    }
    if (checkPositiveNumber(value)) {
        callback(); // 验证通过
    } else {
        callback(new Error('请输入有效数字（正数）'));
    }
};

/**
 * Element Plus 表单验证器：姓名（中文为主）
 * @param {Object} rule - 表单规则
 * @param {string} value - 输入值
 * @param {Function} callback - 回调函数
 * @param {number} min - 最小长度（默认2）
 * @param {number} max - 最大长度（默认20）
 */
export const validateName = (rule, value, callback, min = 2, max = 20) => {
    if (!value) {
        return callback(new Error('请输入姓名'));
    }
    if (checkName(value, min, max)) {
        callback(); // 验证通过
    } else {
        callback(new Error(`姓名格式不正确（长度${min}-${max}位，支持中文、英文）`));
    }
};

/**
 * Element Plus 表单验证器：日期格式（YYYY-MM-DD）
 * @param {Object} rule - 表单规则
 * @param {string} value - 输入值
 * @param {Function} callback - 回调函数
 */
export const validateDate = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入日期'));
    }
    if (checkDate(value)) {
        callback(); // 验证通过
    } else {
        callback(new Error('日期格式不正确（需YYYY-MM-DD）'));
    }
};

/**
 * Element Plus 表单验证器：邮箱格式
 * @param {Object} rule - 表单规则
 * @param {string} value - 输入值
 * @param {Function} callback - 回调函数
 */
export const validateEmail = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入邮箱'));
    }
    if (checkEmail(value)) {
        callback(); // 验证通过
    } else {
        callback(new Error('邮箱格式不正确'));
    }
};

/**
 * Element Plus 表单验证器：地址
 * @param {Object} rule - 表单规则
 * @param {string} value - 输入值
 * @param {Function} callback - 回调函数
 * @param {number} min - 最小长度（默认5）
 * @param {number} max - 最大长度（默认100）
 */
export const validateAddress = (rule, value, callback, min = 5, max = 100) => {
    if (!value) {
        return callback(new Error('请输入地址'));
    }
    if (checkAddress(value, min, max)) {
        callback(); // 验证通过
    } else {
        callback(new Error(`地址长度需在${min}-${max}位之间`));
    }
};

/**
 * Element Plus 表单验证器：贷款用途
 * @param {Object} rule - 表单规则
 * @param {string} value - 输入值
 * @param {Function} callback - 回调函数
 * @param {number} min - 最小长度（默认2）
 * @param {number} max - 最大长度（默认200）
 */
export const validatePurpose = (rule, value, callback, min = 2, max = 200) => {
    if (!value) {
        return callback(new Error('请输入贷款用途'));
    }
    if (checkPurpose(value, min, max)) {
        callback(); // 验证通过
    } else {
        callback(new Error(`贷款用途长度需在${min}-${max}位之间`));
    }
};
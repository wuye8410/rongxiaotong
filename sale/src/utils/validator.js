// src/utils/validator.js

/**
 * 验证身份证号（18位）
 * @param {string} idCard - 身份证号字符串
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validateIdCard = (idCard) => {
    if (!idCard) return false;
    // 基本格式校验
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
 * 验证手机号（中国大陆）
 * @param {string} phone - 手机号字符串
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validatePhone = (phone) => {
    if (!phone) return false;
    // 11位数字，以1开头，第二位为3-9
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(phone);
};

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱字符串
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validateEmail = (email) => {
    if (!email) return false;
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return reg.test(email);
};

/**
 * 验证地址（非空且长度适中）
 * @param {string} address - 地址字符串
 * @param {number} min - 最小长度（默认5）
 * @param {number} max - 最大长度（默认100）
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validateAddress = (address, min = 5, max = 100) => {
    if (!address) return false;
    const trimmed = address.trim();
    return trimmed.length >= min && trimmed.length <= max;
};

/**
 * 验证贷款用途（非空且合理长度）
 * @param {string} purpose - 用途描述
 * @param {number} min - 最小长度（默认2）
 * @param {number} max - 最大长度（默认200）
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validatePurpose = (purpose, min = 2, max = 200) => {
    if (!purpose) return false;
    const trimmed = purpose.trim();
    return trimmed.length >= min && trimmed.length <= max;
};

/**
 * 验证金额（正数，最多两位小数）
 * @param {string|number} amount - 金额
 * @param {number} min - 最小金额（默认0）
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validateAmount = (amount, min = 0) => {
    if (amount === undefined || amount === null) return false;
    // 转换为字符串处理
    const str = String(amount).trim();
    // 匹配正数，支持整数或最多两位小数
    const reg = /^\d+(\.\d{1,2})?$/;
    if (!reg.test(str)) return false;
    // 验证最小值
    return Number(str) >= min;
};

/**
 * 验证姓名（中文为主，支持少数英文）
 * @param {string} name - 姓名
 * @param {number} min - 最小长度（默认2）
 * @param {number} max - 最大长度（默认20）
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validateName = (name, min = 2, max = 20) => {
    if (!name) return false;
    const trimmed = name.trim();
    // 中文、英文、空格、·（中间点）
    const reg = /^[\u4e00-\u9fa5a-zA-Z·\s]+$/;
    if (!reg.test(trimmed)) return false;
    return trimmed.length >= min && trimmed.length <= max;
};

/**
 * 验证日期格式（YYYY-MM-DD）
 * @param {string} date - 日期字符串
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validateDate = (date) => {
    if (!date) return false;
    const reg = /^\d{4}-\d{2}-\d{2}$/;
    if (!reg.test(date)) return false;
    // 验证实际日期有效性
    const [year, month, day] = date.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
};
// src/utils/validator.js 中添加以下代码
/**
 * 验证正数（大于0的数字，支持整数和小数）
 * @param {string|number} value - 待验证的值
 * @returns {boolean} 验证通过返回true，否则返回false
 */
export const validatePositiveNumber = (value) => {
    if (value === undefined || value === null || value === '') return false;
    // 转换为字符串处理，避免数字类型的隐式转换问题
    const str = String(value).trim();
    // 匹配大于0的整数或小数（支持如 123、123.45 等格式）
    const reg = /^[1-9]\d*(\.\d+)?$/;
    return reg.test(str);
};
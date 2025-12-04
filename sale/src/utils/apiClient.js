// src/utils/apiClient.js
import axios from 'axios'

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: '/api', // 你的接口基础路径
    timeout: 5000, // 超时时间
    headers: {
        'Content-Type': 'application/json'
    }
})

// 可以添加请求/响应拦截器
apiClient.interceptors.request.use(
    config => {
        // 例如添加 token
        // const token = localStorage.getItem('token')
        // if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    error => Promise.reject(error)
)

export default apiClient
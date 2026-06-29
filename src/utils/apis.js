import axios from 'axios';
import { config } from './config';

export const host = import.meta.env.MODE === 'production'
  ? ""
  : `${config.apiProtocol}://${config.apiHost}${config.apiPort ? `:${config.apiPort}` : ''}`;

export const instance = axios.create({
  baseURL: `${host}/api`,
  timeout: config.apiTimeout,
});

// 請求攔截器 - 設定 token
instance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 回應攔截器 - 處理例外
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 統一處理錯誤
    if (error.response?.status === 401) {
      // 可以在這裡觸發登出邏輯
      localStorage.removeItem("token");
      // 可選：重定向到登入頁面
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const api = (logout = () => { }) => {
  return {
    getAllUsers: (params = {}) => instance.get('/user/list', { params }),
    getAllItems: (params = {}) => instance.get('/item/listByPoint', { params }),
    getAllPoints: (params = {}) => instance.get('/point/list', { params }),
    getAllPlans: (params = {}) => instance.get('/plan/list', { params }),
    getAllTasks: (params = {}) => instance.get('/task/list', { params }),
    getAllTasksByInspector: (params = {}) => instance.get('/task/inspector', { params }),
    getTaskDetail: (params = {}) => instance.get('/task/detail', { params }),
    getDashboardRankingItems: (params = {}) => instance.get('/dashboard/ranking/items', { params }),
    getDashboardRankingPoints: (params = {}) => instance.get('/dashboard/ranking/points', { params }),
    getDashboardRankingPlans: (params = {}) => instance.get('/dashboard/ranking/plans', { params }),
    getDashboardRecordStatus: (params = {}) => instance.get('/dashboard/record/status', { params }),

    postAddItem: ({ data }) => instance.post('/item/create', data),

    putUpdateItem: ({ itemId, data }) => instance.put(`/item/update/${itemId}`, data),

    deleteItem: ({ itemId }) => instance.delete(`/item/delete/${itemId}`),
  };
};



import { instance } from '../axios';

// 使用者屬性相關 API
export const userAttributeApi = {
  // 取得使用者屬性清單
  getUserAttributes: async (params = {}) => {
    return await instance.get('/v1/userAttribute', { params });
  },
  
  // 根據 ID 取得使用者屬性
  getUserAttributeById: async ({ id }) => {
    return await instance.get(`/v1/userAttribute/${id}`);
  },
  
  // 新增使用者屬性
  postAddUserAttribute: async ({ data }) => {
    return await instance.post('/v1/userAttribute', data);
  },
  
  // 更新使用者屬性
  putUpdateUserAttribute: async ({ id, data }) => {
    return await instance.put(`/v1/userAttribute/${id}`, data);
  },
  
  // 刪除使用者屬性
  deleteUserAttribute: async ({ id }) => {
    return await instance.delete(`/v1/userAttribute/${id}`);
  }
};

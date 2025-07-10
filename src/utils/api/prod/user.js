import { instance } from '../axios';

// 使用者相關 API
export const userApi = {
  // 取得使用者清單
  getUsers: async (params = {}) => {
    return await instance.get('/v1/user', { params });
  },
  
  // 根據 ID 取得使用者
  getUserById: async ({ id }) => {
    return await instance.get(`/v1/user/${id}`);
  },
  
  // 新增使用者
  postCreateUser: async ({ data }) => {
    return await instance.post('/v1/user', data);
  },
  
  // 更新使用者
  putUpdateUser: async ({ id, data }) => {
    return await instance.put(`/v1/user/${id}`, data);
  },
  
  // 刪除使用者
  deleteUser: async ({ id }) => {
    return await instance.delete(`/v1/user/${id}`);
  },
};

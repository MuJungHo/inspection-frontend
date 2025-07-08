import { instance } from '../axios';

// 使用者相關 API
export const usersApi = {
  // 取得使用者清單
  getUsers: async (params = {}) => {
    return await instance.get('/v1/user', { params });
  },
  
  // 根據 ID 取得使用者
  getUserById: async ({ id }) => {
    return await instance.get(`/v1/user/${id}`);
  },
  
  // 新增使用者
  postAddUser: async ({ data }) => {
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

  // === 為了向後相容保留的舊版 API ===
  // 取得使用者清單 (舊版)
  getUserList: async (params = {}) => {
    return await instance.get('/user/list', { params });
  },
  
  // 新增使用者 (舊版)
  postCreateUser: async ({ data }) => {
    return await instance.post('/user/create', data);
  },
  
  // 修改使用者 (舊版)
  putUpdateUserOld: async ({ data, ...rest }) => {
    return await instance.put('/user/update', data, { params: rest });
  },
  
  // 刪除使用者 (舊版)
  deleteUserOld: async ({ ...rest }) => {
    return await instance.delete('/user/delete', { params: rest });
  }
};

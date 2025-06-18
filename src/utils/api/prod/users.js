import { instance } from '../axios';

// 使用者相關 API (保持與現有程式碼的相容性)
export const usersApi = {
  // 取得使用者清單
  getUserList: async (params = {}) => {
    return await instance.get('/user/list', { params });
  },
  
  // 新增使用者
  postCreateUser: async ({ data }) => {
    return await instance.post('/user/create', data);
  },
  
  // 修改使用者
  putUpdateUser: async ({ data, ...rest }) => {
    return await instance.put('/user/update', data, { params: rest });
  },
  
  // 刪除使用者
  deleteUser: async ({ ...rest }) => {
    return await instance.delete('/user/delete', { params: rest });
  }
};

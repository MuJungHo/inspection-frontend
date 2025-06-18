import { instance } from '../../axios';

// FailoverGroup 設備相關 API
export const failoverGroupApi = {
  // 取得容錯群組清單
  getFailoverGroups: async (params = {}) => {
    return await instance.get('/v1/FailoverGroup', { params });
  },
  
  // 根據 ID 取得容錯群組
  getFailoverGroupById: async ({ id }) => {
    return await instance.get(`/v1/FailoverGroup/${id}`);
  },
  
  // 新增容錯群組
  postCreateFailoverGroup: async ({ data }) => {
    return await instance.post('/v1/FailoverGroup', data);
  },
  
  // 修改容錯群組
  patchUpdateFailoverGroup: async ({ id, data }) => {
    return await instance.patch(`/v1/FailoverGroup/${id}`, data);
  },
  
  // 刪除容錯群組
  deleteFailoverGroup: async ({ id }) => {
    return await instance.delete(`/v1/FailoverGroup/${id}`);
  }
};

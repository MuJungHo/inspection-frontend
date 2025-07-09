import { instance } from '../axios';

// 角色屬性相關 API
export const roleAttributeApi = {
  // 取得角色屬性清單
  getRoleAttributes: async (params = {}) => {
    return await instance.get('/v1/roleAttribute', { params });
  },
  
  // 根據 ID 取得角色屬性
  getRoleAttributeById: async ({ id }) => {
    return await instance.get(`/v1/roleAttribute/${id}`);
  },
  
  // 新增角色屬性
  postAddRoleAttribute: async ({ data }) => {
    return await instance.post('/v1/roleAttribute', data);
  },
  
  // 更新角色屬性
  putUpdateRoleAttribute: async ({ id, data }) => {
    return await instance.put(`/v1/roleAttribute/${id}`, data);
  },
  
  // 刪除角色屬性
  deleteRoleAttribute: async ({ id }) => {
    return await instance.delete(`/v1/roleAttribute/${id}`);
  }
};

import { instance } from '../axios';

// 角色相關 API
export const roleApi = {
  // 取得角色清單
  getRoles: async (params = {}) => {
    return await instance.get('/v1/user/role', { params });
  },
  
  // 根據 ID 取得角色
  getRoleById: async ({ id }) => {
    return await instance.get(`/v1/user/role/${id}`);
  },
  
  // 新增角色
  postCreateRole: async ({ data }) => {
    return await instance.post('/v1/user/role', data);
  },
  
  // 更新角色
  putUpdateRole: async ({ id, data }) => {
    return await instance.put(`/v1/user/role/${id}`, data);
  },
  
  // 刪除角色
  deleteRole: async ({ id }) => {
    return await instance.delete(`/v1/user/role/${id}`);
  }
};

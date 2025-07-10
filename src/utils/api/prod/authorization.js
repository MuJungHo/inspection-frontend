import { instance } from '../axios';

// 權限相關 API
export const authorizationApi = {
  // 取得權限清單
  getAuthorizations: async (params = {}) => {
    return await instance.get('/v1/user/authorization', { params });
  },
  
  // 取得權限名稱清單
  getAuthorizationNames: async (params = {}) => {
    return await instance.get('/v1/user/authorization/names', { params });
  },
  
  // 根據名稱取得權限
  getAuthorizationsByName: async ({ name }) => {
    return await instance.get(`/v1/user/authorization/byName/${name}`);
  },
  
  // 根據 ID 取得權限
  getAuthorizationById: async ({ id }) => {
    return await instance.get(`/v1/user/authorization/${id}`);
  },
  
  // 新增權限
  postCreateAuthorization: async ({ data }) => {
    return await instance.post('/v1/user/authorization', data);
  },
  
  // 更新權限
  putUpdateAuthorization: async ({ id, data }) => {
    return await instance.put(`/v1/user/authorization/${id}`, data);
  },
  
  // 刪除權限
  deleteAuthorization: async ({ id }) => {
    return await instance.delete(`/v1/user/authorization/${id}`);
  }
};

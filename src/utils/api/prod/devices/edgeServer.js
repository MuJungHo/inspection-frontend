import { instance } from '../../axios';

// EdgeServer 設備相關 API
export const edgeServerApi = {
  // 取得 EdgeServer 清單
  getEdgeServers: async (params = {}) => {
    return await instance.get('/v1/EdgeServer', { params });
  },
  
  // 根據 ID 取得 EdgeServer
  getEdgeServerById: async ({ id }) => {
    return await instance.get(`/v1/EdgeServer/${id}`);
  },
  
  // 新增 EdgeServer
  postCreateEdgeServer: async ({ data }) => {
    return await instance.post('/v1/EdgeServer', data);
  },
  
  // 修改 EdgeServer
  patchUpdateEdgeServer: async ({ id, data }) => {
    return await instance.patch(`/v1/EdgeServer/${id}`, data);
  },
  
  // 刪除 EdgeServer
  deleteEdgeServer: async ({ id }) => {
    return await instance.delete(`/v1/EdgeServer/${id}`);
  },
  // 取得 EdgeServer History 清單
  getEdgeServerHistories: async ({ id }) => {
    return await instance.get(`/v1/EdgeServer/history/${id}`);
  },
};

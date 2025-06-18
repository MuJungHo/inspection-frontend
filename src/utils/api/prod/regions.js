import { instance } from '../axios';

// 區域管理相關 API
export const regionsApi = {
  // 取得區域清單
  getRegions: async (params = {}) => {
    return await instance.get('/v1/region', { params });
  },
  
  // 新增區域
  postCreateRegion: async ({ data }) => {
    return await instance.post('/v1/region', data);
  },
  
  // 修改區域
  patchUpdateRegion: async ({ id, data }) => {
    return await instance.patch(`/v1/region/${id}`, data);
  },
  
  // 刪除區域
  deleteRegion: async ({ id }) => {
    return await instance.delete(`/v1/region/${id}`);
  }
};

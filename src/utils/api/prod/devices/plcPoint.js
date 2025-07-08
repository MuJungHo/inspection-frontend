import { instance } from '../../axios';

// PLC Point 相關 API
export const plcPointApi = {
  // 取得 PLC Point 清單
  getPLCPoints: async (params = {}) => {
    return await instance.get('/v1/PLCPoint', { params });
  },
  
  // 根據 ID 取得 PLC Point
  getPLCPointById: async ({ id }) => {
    return await instance.get(`/v1/PLCPoint/${id}`);
  },
  
  // 根據 PLC ID 取得 PLC Point
  getPLCPointByPLCId: async ({ plcId }) => {
    return await instance.get(`/v1/PLCPoint/byPLC/${plcId}`);
  },
  
  // 新增 PLC Point
  postCreatePLCPoint: async ({ data }) => {
    return await instance.post('/v1/PLCPoint', data);
  },
  
  // 修改 PLC Point
  patchUpdatePLCPoint: async ({ id, data }) => {
    return await instance.patch(`/v1/PLCPoint/${id}`, data);
  },
  
  // 刪除 PLC Point
  deletePLCPoint: async ({ id }) => {
    return await instance.delete(`/v1/PLCPoint/${id}`);
  }
};

import { instance } from '../../axios';

// PLC 設備相關 API
export const plcApi = {
  // 取得 PLC 清單
  getPLCs: async (params = {}) => {
    return await instance.get('/v1/PLC', { params });
  },
  
  // 根據 ID 取得 PLC
  getPLCById: async ({ id }) => {
    return await instance.get(`/v1/PLC/${id}`);
  },
  
  // 根據 Gate ID 取得 PLC
  getPLCByGateId: async ({ gateId }) => {
    return await instance.get(`/v1/PLC/byGate/${gateId}`);
  },
  
  // 新增 PLC
  postCreatePLC: async ({ data }) => {
    return await instance.post('/v1/PLC', data);
  },
  
  // 修改 PLC
  patchUpdatePLC: async ({ id, data }) => {
    return await instance.patch(`/v1/PLC/${id}`, data);
  },
  
  // 刪除 PLC
  deletePLC: async ({ id }) => {
    return await instance.delete(`/v1/PLC/${id}`);
  }
};

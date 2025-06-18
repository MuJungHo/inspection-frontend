import { instance } from '../axios';

// 停車設施閘門車道相關 API
export const parkingFacilityGateLanesApi = {
  // 取得停車設施閘門車道清單
  getParkingFacilityGateLanes: async (params = {}) => {
    return await instance.get('/v1/ParkingFacilityGateLane', { params });
  },
  
  // 根據閘門 ID 取得車道
  getParkingFacilityGateLanesByGateId: async ({ gateId }) => {
    return await instance.get(`/v1/ParkingFacilityGateLane/byGate/${gateId}`);
  },
  
  // 新增停車設施閘門車道
  postCreateParkingFacilityGateLane: async ({ data }) => {
    return await instance.post('/v1/ParkingFacilityGateLane', data);
  },
  
  // 修改停車設施閘門車道
  patchUpdateParkingFacilityGateLane: async ({ id, data }) => {
    return await instance.patch(`/v1/ParkingFacilityGateLane/${id}`, data);
  },
  
  // 刪除停車設施閘門車道
  deleteParkingFacilityGateLane: async ({ id }) => {
    return await instance.delete(`/v1/ParkingFacilityGateLane/${id}`);
  }
};

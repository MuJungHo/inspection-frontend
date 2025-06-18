import { instance } from '../axios';

// 停車設施閘門相關 API
export const parkingFacilityGatesApi = {
  // 取得停車設施閘門清單
  getParkingFacilityGates: async (params = {}) => {
    return await instance.get('/v1/ParkingFacilityGate', { params });
  },
  
  // 根據 ID 取得停車設施閘門
  getParkingFacilityGateById: async ({ id }) => {
    return await instance.get(`/v1/ParkingFacilityGate/${id}`);
  },
  
  // 根據停車設施 ID 取得閘門
  getParkingFacilityGateByFacilityId: async ({ facilityId }) => {
    return await instance.get(`/v1/ParkingFacilityGate/byParkingFacility/${facilityId}`);
  },
  
  // 新增停車設施閘門
  postCreateParkingFacilityGate: async ({ data }) => {
    return await instance.post('/v1/ParkingFacilityGate', data);
  },
  
  // 修改停車設施閘門
  patchUpdateParkingFacilityGate: async ({ id, data }) => {
    return await instance.patch(`/v1/ParkingFacilityGate/${id}`, data);
  },
  
  // 刪除停車設施閘門
  deleteParkingFacilityGate: async ({ id }) => {
    return await instance.delete(`/v1/ParkingFacilityGate/${id}`);
  }
};

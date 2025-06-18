import { instance } from '../axios';

// 停車設施相關 API
export const parkingFacilitiesApi = {
  // 取得停車設施清單
  getParkingFacilities: async (params = {}) => {
    return await instance.get('/v1/ParkingFacility', { params });
  },
  
  // 根據 ID 取得停車設施
  getParkingFacilityById: async ({ id }) => {
    return await instance.get(`/v1/ParkingFacility/${id}`);
  },
  
  // 根據區域 ID 取得停車設施
  getParkingFacilityByRegionId: async ({ regionId }) => {
    return await instance.get(`/v1/ParkingFacility/byRegion/${regionId}`);
  },
  
  // 新增停車設施
  postCreateParkingFacility: async ({ data }) => {
    return await instance.post('/v1/ParkingFacility', data);
  },
  
  // 修改停車設施
  patchUpdateParkingFacility: async ({ id, data }) => {
    return await instance.patch(`/v1/ParkingFacility/${id}`, data);
  },
  
  // 刪除停車設施
  deleteParkingFacility: async ({ id }) => {
    return await instance.delete(`/v1/ParkingFacility/${id}`);
  }
};

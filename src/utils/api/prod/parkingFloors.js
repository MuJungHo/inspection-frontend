import { instance } from '../axios';

// 停車樓層 API
export const parkingFloorApi = {

  getParkingFloor: async ({ parkingFloorId }) => {
    return await instance.get(`/v1/ParkingFloor/${parkingFloorId}`);
  },

  // 根據 parkingFacilityId 取得停車樓層
  getParkingFloors: async ({ parkingFacilityId }) => {
    return await instance.get(`/v1/ParkingFloor/byFacility/${parkingFacilityId}`);
  },

  // 根據 parkingFloorId 取得停車格
  getParkingSpacesByFloor: async ({ parkingFloorId, ...rest }) => {
    return await instance.get(`/v1/ParkingSpace/byFloor/${parkingFloorId}`, { params: { ...rest } });
  },

  // 根據 parkingFloorId 取得停車格狀態
  getParkingSpacesStatusByFloor: async ({ parkingFloorId, ...rest }) => {
    return await instance.get(`/v1/ParkingSpace/status/byFloor/${parkingFloorId}`, { params: { ...rest } });
  }
};

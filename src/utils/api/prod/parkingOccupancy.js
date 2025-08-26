import { instance } from '../axios';

// 停車樓層 API
export const parkingOccupancyApi = {

  //根據廠區取得停車總數紀錄
  getParkingOccupancys: async ({ parkingFacilityId }) => {
    return await instance.get(`/v1/ParkingOccupancy/byFacility/${parkingFacilityId}`);
  },

  //取得停車總數紀錄歷史
  getParkingOccupancyHistory: async ({ parkingOccupancyId, ...rest }) => {
    return await instance.get(`/v1/ParkingOccupancy/${parkingOccupancyId}/history`, { params: { ...rest } });
  },

  // 修正停車總數
  patchUpdateParkingOccupancy: async ({ parkingOccupancyId, data }) => {
    return await instance.patch(`/v1/ParkingOccupancy/${parkingOccupancyId}`, data);
  },

  // 取得停車總數修正紀錄
  getParkingOccupancyAdjustmentlog: async ({ parkingOccupancyId, ...rest }) => {
    return await instance.get(`/v1/ParkingOccupancy/${parkingOccupancyId}/adjustmentlog`, { params: { ...rest } });
  },


};

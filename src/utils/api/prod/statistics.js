import { instance } from '../axios';

// 統計圖表相關 API
export const statisticsApi = {
  // 根據停車格種類取得已占用車位
  getStatisticsBySpaceType: async (params = {}) => {
    return await instance.get('/v1/Statistics/bySpaceType', { params });
  },
  getStatisticsOccupancyByFacilityId: async ({ facilityId, params }) => {
    return await instance.get(`/v1/Statistics/Occupancy/${facilityId}`, { params });
  },
  
  getStatisticsInformationByFacilityId: async ({ facilityId }) => {
    return await instance.get(`/v1/Statistics/Information/${facilityId}`);
  },

  postTestNotify: async ({ data }) => {
    return await instance.post('/v1/test/notify', data);
  },
  
};

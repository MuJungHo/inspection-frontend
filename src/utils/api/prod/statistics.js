import { instance } from '../axios';

// 統計圖表相關 API
export const statisticsApi = {
  // 根據停車格種類取得已占用車位
  getStatistics: async (params = {}) => {
    return await instance.get('/v1/Statistics/bySpaceType', { params });
  },
};

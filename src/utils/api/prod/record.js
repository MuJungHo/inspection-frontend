import { instance } from '../axios';

// 紀錄相關 API
export const recordApi = {
  getImageByFileId: async ({ id }) => {
    return await instance.get(`/v1/Image/${id}`);
  },
  getAbnormalRecordInstants: async () => {
    return await instance.get('/v1/AbnormalRecord/Instant');
  },
  getAbnormalRecordRecords: async (params = {}) => {
    return await instance.get('/v1/AbnormalRecord/Records', { params });
  },
  getUsageRecordInstants: async () => {
    return await instance.get('/v1/UsageRecord/Instant');
  },
  getUsageRecordByPlate: async (params = {}) => {
    return await instance.get('/v1/UsageRecord/byPlate', { params });
  }
};

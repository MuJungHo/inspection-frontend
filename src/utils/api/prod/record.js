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
  },
  getUsageRecordByTime: async (params = {}) => {
    return await instance.get('/v1/UsageRecord/byTime', { params });
  },
  getUsageRecordHistory: async ({ parkingFacilityUsageRecordId }) => {
    return await instance.get(`/v1/UsageRecord/history/${parkingFacilityUsageRecordId}`);
  },
  patchUsageRecord: async ({ id, data }) => {
    return await instance.patch(`/v1/UsageRecord/revise/entry/${id}`, data);
  },
};

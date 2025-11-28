import { instance } from '../axios';

// 紀錄相關 API
export const recordApi = {
  getImageByFileId: async ({ id }) => {
    return await instance.get(`/v1/Image/${id}`);
  },
  getAbnormalRecordInstants: async (params = {}) => {
    return await instance.get('/v1/AbnormalRecord/Instant', { params });
  },
  getAbnormalRecordRecords: async (params = {}) => {
    return await instance.get('/v1/AbnormalRecord/Records', { params });
  },
  getAbnormalRecordRecordsExport: async (params = {}) => {
    return await instance.get('/v1/AbnormalRecord/Records/Export', {
      params,
      responseType: 'blob'
    });
  },
  postManualRecordAbnormalRecord: async ({ abnormalRecordId, data }) => {
    return await instance.post(`/v1/AbnormalRecord/ManualRecord/${abnormalRecordId}`, data);
  },
  getAbnormalRecordHistory: async ({ abnormalRecordId }) => {
    return await instance.get(`/v1/AbnormalRecord/history/${abnormalRecordId}`);
  },
  getUsageRecordInstants: async (params = {}) => {
    return await instance.get('/v1/UsageRecord/Instant', { params });
  },
  getUsageRecordByPlate: async (params = {}) => {
    return await instance.get('/v1/UsageRecord/byPlate', { params });
  },
  getUsageRecordByTime: async (params = {}) => {
    return await instance.get('/v1/UsageRecord/byTime', { params });
  },
  getUsageRecordByTimeExport: async (params = {}) => {
    return await instance.get('/v1/UsageRecord/byTime/Export', {
      params,
      responseType: 'blob'
    });
  },
  getUsageRecordHistory: async ({ parkingFacilityUsageRecordId }) => {
    return await instance.get(`/v1/UsageRecord/history/${parkingFacilityUsageRecordId}`);
  },
  patchUsageRecord: async ({ id, data }) => {
    return await instance.patch(`/v1/UsageRecord/revise/entry/${id}`, data);
  },
  patchAbnormalRecord: async ({ abnormalRecordId, data }) => {
    return await instance.patch(`/v1/AbnormalRecord/${abnormalRecordId}`, data);
  },
  getParkingRecord: async (params = {}) => {
    return await instance.get('/v1/ParkingRecord', { params });
  },
};

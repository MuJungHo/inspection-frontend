import { instance } from '../axios';

export const systemsettingApi = {

  getSystemSettings: async (params = {}) => {
    return await instance.get('/v1/systemsettings', { params });
  },

  getSystemSettingHistoryById: async ({ settingId }) => {
    return await instance.get(`/v1/systemsettings/history/${settingId}`);
  },
  
  postCreateSystemSetting: async ({ data }) => {
    return await instance.post('/v1/systemsettings', data);
  },
  
  pathchUpdateSystemSetting: async ({ id, data }) => {
    return await instance.patch(`/v1/systemsettings/${id}`, data);
  },
  
  deleteSystemSetting: async ({ id }) => {
    return await instance.delete(`/v1/systemsettings/${id}`);
  },
};

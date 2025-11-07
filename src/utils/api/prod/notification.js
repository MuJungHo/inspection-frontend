import { instance } from '../axios';

export const notificationApi = {
  getNotifications: async (params = {}) => {
    return await instance.get('/v1/notification', { params });
  },
};

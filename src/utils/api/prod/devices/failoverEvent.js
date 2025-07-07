import { instance } from '../../axios';

// 容錯事件相關 API
export const failoverEventApi = {
  // 根據 Group ID 取得容錯事件清單
  getFailoverEventsByGroupId: async ({ id }) => {
    return await instance.get(`/v1/FailoverEvent/byGroup/${id}`);
  },
};

import { instance } from '../../axios';

// FailoverGroupMember 容錯群組成員相關 API
export const failoverGroupMemberApi = {
  // 取得容錯群組成員清單
  getFailoverGroupMembers: async (params = {}) => {
    return await instance.get('/v1/FailoverGroupMember', { params });
  },
  
  // 根據 ID 取得容錯群組內成員
  getFailoverGroupMembersById: async ({ id }) => {
    return await instance.get(`/v1/FailoverGroupMember/byGroup/${id}`);
  },
  
  // 新增容錯群組成員
  postCreateFailoverGroupMember: async ({ data }) => {
    return await instance.post('/v1/FailoverGroupMember', data);
  },
  
  // 修改容錯群組成員
  patchUpdateFailoverGroupMember: async ({ id, data }) => {
    return await instance.patch(`/v1/FailoverGroupMember/${id}`, data);
  },
  
  // 刪除容錯群組成員
  deleteFailoverGroupMember: async ({ id }) => {
    return await instance.delete(`/v1/FailoverGroupMember/${id}`);
  }
};

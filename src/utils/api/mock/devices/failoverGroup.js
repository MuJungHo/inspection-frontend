// Mock FailoverGroup 設備相關 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dummyFailoverGroupList = [
  {
    id: 'failover-group-1',
    name: 'FailoverGroup-01',
    status: 'active',
    primaryServerId: 'edge-server-1',
    backupServerId: 'edge-server-2',
    description: '主要容錯群組'
  },
  {
    id: 'failover-group-2',
    name: 'FailoverGroup-02',
    status: 'standby',
    primaryServerId: 'edge-server-2',
    backupServerId: 'edge-server-1',
    description: '備用容錯群組'
  }
];

export const failoverGroupApi = {
  // 取得容錯群組清單
  getFailoverGroups: async (params = {}) => {
    await delay(300);
    return dummyFailoverGroupList;
  },
  
  // 根據 ID 取得容錯群組
  getFailoverGroupById: async ({ id }) => {
    await delay(300);
    const group = dummyFailoverGroupList.find(g => g.id === id);
    if (!group) {
      throw new Error('找不到指定的容錯群組');
    }
    return group;
  },
  
  // 新增容錯群組
  postCreateFailoverGroup: async ({ data }) => {
    await delay(500);
    const newGroup = { 
      ...data, 
      id: 'mock-failover-group-' + Date.now() 
    };
    return { success: true, data: newGroup };
  },
  
  // 修改容錯群組
  patchUpdateFailoverGroup: async ({ id, data }) => {
    await delay(500);
    return { success: true, data: { ...data, id } };
  },
  
  // 刪除容錯群組
  deleteFailoverGroup: async ({ id }) => {
    await delay(500);
    return { success: true, id };
  }
};

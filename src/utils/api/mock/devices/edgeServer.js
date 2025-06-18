// Mock EdgeServer 設備相關 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dummyEdgeServerList = [
  {
    id: 'edge-server-1',
    name: 'EdgeServer-01',
    ipAddress: '192.168.1.100',
    status: 'online',
    description: '主要邊緣伺服器'
  },
  {
    id: 'edge-server-2',
    name: 'EdgeServer-02',
    ipAddress: '192.168.1.101',
    status: 'offline',
    description: '備用邊緣伺服器'
  }
];

export const edgeServerApi = {
  // 取得 EdgeServer 清單
  getEdgeServers: async (params = {}) => {
    await delay(300);
    return dummyEdgeServerList;
  },
  
  // 根據 ID 取得 EdgeServer
  getEdgeServerById: async ({ id }) => {
    await delay(300);
    const server = dummyEdgeServerList.find(s => s.id === id);
    if (!server) {
      throw new Error('找不到指定的 EdgeServer');
    }
    return server;
  },
  
  // 新增 EdgeServer
  postCreateEdgeServer: async ({ data }) => {
    await delay(500);
    const newServer = { 
      ...data, 
      id: 'mock-edge-server-' + Date.now() 
    };
    return { success: true, data: newServer };
  },
  
  // 修改 EdgeServer
  patchUpdateEdgeServer: async ({ id, data }) => {
    await delay(500);
    return { success: true, data: { ...data, id } };
  },
  
  // 刪除 EdgeServer
  deleteEdgeServer: async ({ id }) => {
    await delay(500);
    return { success: true, id };
  }
};

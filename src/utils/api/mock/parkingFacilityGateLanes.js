// Mock 停車設施閘門車道相關 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dummyParkingFacilityGateLaneList = [
  {
    id: 'lane-1',
    gateId: '9f74b775-9cc6-4a58-85aa-2ea2741d3dd6',
    name: 'Lane 1',
    description: '第一車道'
  },
  {
    id: 'lane-2',
    gateId: '9f74b775-9cc6-4a58-85aa-2ea2741d3dd6',
    name: 'Lane 2',
    description: '第二車道'
  }
];

export const parkingFacilityGateLanesApi = {
  // 取得停車設施閘門車道清單
  getParkingFacilityGateLanes: async (params = {}) => {
    await delay(300);
    return dummyParkingFacilityGateLaneList;
  },
  
  // 根據閘門 ID 取得車道
  getParkingFacilityGateLanesByGateId: async ({ gateId }) => {
    await delay(300);
    return dummyParkingFacilityGateLaneList.filter(l => l.gateId === gateId);
  },
  
  // 新增停車設施閘門車道
  postCreateParkingFacilityGateLane: async ({ data }) => {
    await delay(500);
    const newLane = { 
      ...data, 
      id: 'mock-lane-' + Date.now() 
    };
    return { success: true, data: newLane };
  },
  
  // 修改停車設施閘門車道
  patchUpdateParkingFacilityGateLane: async ({ id, data }) => {
    await delay(500);
    return { success: true, data: { ...data, id } };
  },
  
  // 刪除停車設施閘門車道
  deleteParkingFacilityGateLane: async ({ id }) => {
    await delay(500);
    return { success: true, id };
  }
};

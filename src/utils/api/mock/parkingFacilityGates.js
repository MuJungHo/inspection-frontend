// Mock 停車設施閘門相關 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dummyParkingFacilityGateList = [
  {
    id: '9f74b775-9cc6-4a58-85aa-2ea2741d3dd6',
    parkingFacilityId: '24178ddc-ec0e-47d4-83d8-385d2396f505',
    name: 'G1',
    description: 'G1哨口'
  },
  {
    id: 'c17aff23-edeb-4054-908c-383834c3e942',
    parkingFacilityId: '24178ddc-ec0e-47d4-83d8-385d2396f505',
    name: 'G2',
    description: 'G2哨口'
  }
];

export const parkingFacilityGatesApi = {
  // 取得停車設施閘門清單
  getParkingFacilityGates: async (params = {}) => {
    await delay(300);
    return dummyParkingFacilityGateList;
  },
  
  // 根據 ID 取得停車設施閘門
  getParkingFacilityGateById: async ({ id }) => {
    await delay(300);
    const gate = dummyParkingFacilityGateList.find(g => g.id === id);
    if (!gate) {
      throw new Error('找不到指定的停車設施閘門');
    }
    return gate;
  },
  
  // 根據停車設施 ID 取得閘門
  getParkingFacilityGateByFacilityId: async ({ facilityId }) => {
    await delay(300);
    return dummyParkingFacilityGateList.filter(g => g.parkingFacilityId === facilityId);
  },
  
  // 新增停車設施閘門
  postCreateParkingFacilityGate: async ({ data }) => {
    await delay(500);
    const newGate = { 
      ...data, 
      id: 'mock-gate-' + Date.now() 
    };
    return { success: true, data: newGate };
  },
  
  // 修改停車設施閘門
  patchUpdateParkingFacilityGate: async ({ id, data }) => {
    await delay(500);
    return { success: true, data: { ...data, id } };
  },
  
  // 刪除停車設施閘門
  deleteParkingFacilityGate: async ({ id }) => {
    await delay(500);
    return { success: true, id };
  }
};

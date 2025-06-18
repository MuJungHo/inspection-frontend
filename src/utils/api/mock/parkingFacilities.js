// Mock 停車設施相關 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dummyParkingFacilityList = [
  {
    id: '24178ddc-ec0e-47d4-83d8-385d2396f505',
    regionId: '57f8603d-c09b-42a0-b167-b73923f4db83',
    name: 'F22P1',
    description: '高雄楠梓1'
  },
  {
    id: '35b4b245-4a9e-472a-b994-e9642399e4c6',
    regionId: '57f8603d-c09b-42a0-b167-b73923f4db83',
    name: 'F22P3',
    description: '高雄楠梓3'
  }
];

export const parkingFacilitiesApi = {
  // 取得停車設施清單
  getParkingFacilities: async (params = {}) => {
    await delay(300);
    return dummyParkingFacilityList;
  },
  
  // 根據 ID 取得停車設施
  getParkingFacilityById: async ({ id }) => {
    await delay(300);
    const facility = dummyParkingFacilityList.find(f => f.id === id);
    if (!facility) {
      throw new Error('找不到指定的停車設施');
    }
    return facility;
  },
  
  // 根據區域 ID 取得停車設施
  getParkingFacilityByRegionId: async ({ regionId }) => {
    await delay(300);
    return dummyParkingFacilityList.filter(f => f.regionId === regionId);
  },
  
  // 新增停車設施
  postCreateParkingFacility: async ({ data }) => {
    await delay(500);
    const newFacility = { 
      ...data, 
      id: 'mock-facility-' + Date.now() 
    };
    return { success: true, data: newFacility };
  },
  
  // 修改停車設施
  patchUpdateParkingFacility: async ({ id, data }) => {
    await delay(500);
    return { success: true, data: { ...data, id } };
  },
  
  // 刪除停車設施
  deleteParkingFacility: async ({ id }) => {
    await delay(500);
    return { success: true, id };
  }
};

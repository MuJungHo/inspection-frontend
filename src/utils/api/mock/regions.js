// Mock 區域管理相關 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dummyRegionList = [
  { 
    id: '57f8603d-c09b-42a0-b167-b73923f4db83', 
    name: 'Region1', 
    description: '主要區域',
    regionType: 'Fab',
    parentRegionId: null
  },
  { 
    id: '61b7d7a0-57e1-4130-90c6-da71a19c2868', 
    name: 'Region2', 
    description: '次要區域',
    regionType: 'Fab',
    parentRegionId: null
  }
];

export const regionsApi = {
  // 取得區域清單
  getRegions: async (params = {}) => {
    await delay(300);
    return dummyRegionList;
  },
  
  // 新增區域
  postCreateRegion: async ({ data }) => {
    await delay(500);
    const newRegion = { 
      ...data, 
      id: 'mock-region-' + Date.now() 
    };
    return { success: true, data: newRegion };
  },
  
  // 修改區域
  patchUpdateRegion: async ({ id, data }) => {
    await delay(500);
    return { success: true, data: { ...data, id } };
  },
  
  // 刪除區域
  deleteRegion: async ({ id }) => {
    await delay(500);
    return { success: true, id };
  }
};

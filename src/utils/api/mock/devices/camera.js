// Mock Camera 設備相關 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dummyCameraList = [
  {
    id: 'camera-1',
    name: 'Camera-01',
    ipAddress: '192.168.1.201',
    status: 'online',
    location: '入口',
    description: '入口監控攝影機'
  },
  {
    id: 'camera-2',
    name: 'Camera-02',
    ipAddress: '192.168.1.202',
    status: 'offline',
    location: '出口',
    description: '出口監控攝影機'
  }
];

export const cameraApi = {
  // 取得相機清單
  getCameras: async (params = {}) => {
    await delay(300);
    return dummyCameraList;
  },
  
  // 根據 ID 取得相機
  getCameraById: async ({ id }) => {
    await delay(300);
    const camera = dummyCameraList.find(c => c.id === id);
    if (!camera) {
      throw new Error('找不到指定的攝影機');
    }
    return camera;
  },
  
  // 新增相機
  postCreateCamera: async ({ data }) => {
    await delay(500);
    const newCamera = { 
      ...data, 
      id: 'mock-camera-' + Date.now() 
    };
    return { success: true, data: newCamera };
  },
  
  // 修改相機
  patchUpdateCamera: async ({ id, data }) => {
    await delay(500);
    return { success: true, data: { ...data, id } };
  },
  
  // 刪除相機
  deleteCamera: async ({ id }) => {
    await delay(500);
    return { success: true, id };
  }
};

import { instance } from '../../axios';

// Camera 設備相關 API
export const cameraApi = {
  // 取得相機清單
  getCameras: async (params = {}) => {
    return await instance.get('/v1/Camera', { params });
  },
  
  // 根據 ID 取得相機
  getCameraById: async ({ id }) => {
    return await instance.get(`/v1/Camera/${id}`);
  },
  
  // 新增相機
  postCreateCamera: async ({ data }) => {
    return await instance.post('/v1/Camera', data);
  },
  
  // 修改相機
  patchUpdateCamera: async ({ id, data }) => {
    return await instance.patch(`/v1/Camera/${id}`, data);
  },
  
  // 刪除相機
  deleteCamera: async ({ id }) => {
    return await instance.delete(`/v1/Camera/${id}`);
  }
};

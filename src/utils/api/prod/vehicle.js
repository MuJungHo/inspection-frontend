import { instance } from '../axios';

// 車籍相關 API
export const vehicleApi = {
  getVehicleDataByPlateNumber: async (params = {}) => {
    return await instance.get(`/v1/VehicleData`, { params });
  },
  getVehicleDataSearchByPlateNumber: async ({ plateNumber }) => {
    return await instance.get(`/v1/VehicleData/Search/${plateNumber}`);
  },
};

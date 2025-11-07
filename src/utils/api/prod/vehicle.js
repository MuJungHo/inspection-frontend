import { instance } from '../axios';

// 車籍相關 API
export const vehicleApi = {
  getVehicleDataByPlateNumber: async (params = {}) => {
    return await instance.get(`/v1/VehicleData`, { params });
  },
  getVehicleDataSearchByPlateNumber: async ({ plateNumber }) => {
    return await instance.get(`/v1/VehicleData/Search/${plateNumber}`);
  },
  postFlaggedVehicle: async ({ data }) => {
    return await instance.post('/v1/flaggedvehicle', data);
  },
  getFlaggedVehicleBlacklist: async (params = {}) => {
    return await instance.get('/v1/flaggedvehicle/blacklist', { params });
  },
  getFlaggedVehicleHistory: async (params = {}) => {
    return await instance.get('/v1/flaggedvehicle/history', { params });
  },
  getTemporaryVehicleEntryRecord: async (params = {}) => {
    return await instance.get('/v1/temporaryvehicle/entryrecord', { params });
  },
  postTemporaryVehicle: async ({ data }) => {
    return await instance.post('/v1/temporaryvehicle', data);
  },
};

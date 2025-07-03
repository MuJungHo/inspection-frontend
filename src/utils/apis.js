import { config } from './config';
import * as prodApis from './api/prod';
import * as mockApis from './api/mock';

// 根據環境變數決定使用哪個 API
const apiModules = config.useMockData ? mockApis : prodApis;

// 包裝 API 呼叫以處理登出邏輯
const wrapApiModule = (apiModule, logout) => {
  const wrappedModule = {};
  
  Object.keys(apiModule).forEach(key => {
    wrappedModule[key] = async (params) => {
      try {
        return await apiModule[key](params);
      } catch (error) {
        if (error.response?.status === 401 || error.message === 'Unauthorized') {
          logout();
        }
        throw error;
      }
    };
  });
  
  return wrappedModule;
};

// 新的模組化 API 介面
export const api = (logout = () => {}) => {
  return {
    auth: wrapApiModule(apiModules.authApi, logout),
    users: wrapApiModule(apiModules.usersApi, logout),
    regions: wrapApiModule(apiModules.regionsApi, logout),
    parkingFacilities: wrapApiModule(apiModules.parkingFacilitiesApi, logout),
    parkingFacilityGates: wrapApiModule(apiModules.parkingFacilityGatesApi, logout),
    parkingFacilityGateLanes: wrapApiModule(apiModules.parkingFacilityGateLanesApi, logout),
    // 設備相關
    edgeServer: wrapApiModule(apiModules.edgeServerApi, logout),
    camera: wrapApiModule(apiModules.cameraApi, logout),
    failoverGroup: wrapApiModule(apiModules.failoverGroupApi, logout),
    failoverGroupMember: wrapApiModule(apiModules.failoverGroupMemberApi, logout),
  };
};

// 向後相容性 - 保留原有的扁平化結構
export const compatibleApi = (logout = () => {}) => {
  const modules = api(logout);
  
  return {
    // Auth (更新 API 路徑)
    postAuthLogin: modules.auth.postAuthLogin,
    
    // Users (保持原有命名)
    getUserList: modules.users.getUserList,
    postCreateUser: modules.users.postCreateUser,
    putUpdateUser: modules.users.putUpdateUser,
    deleteUser: modules.users.deleteUser,
    
    // Regions
    getRegions: modules.regions.getRegions,
    postCreateRegion: modules.regions.postCreateRegion,
    patchUpdateRegion: modules.regions.patchUpdateRegion,
    deleteRegion: modules.regions.deleteRegion,
    
    // Parking Facilities
    getParkingFacilities: modules.parkingFacilities.getParkingFacilities,
    getParkingFacilityById: modules.parkingFacilities.getParkingFacilityById,
    getParkingFacilityByRegionId: modules.parkingFacilities.getParkingFacilityByRegionId,
    postCreateParkingFacility: modules.parkingFacilities.postCreateParkingFacility,
    patchUpdateParkingFacility: modules.parkingFacilities.patchUpdateParkingFacility,
    deleteParkingFacility: modules.parkingFacilities.deleteParkingFacility,
    
    // Parking Facility Gates
    getParkingFacilityGates: modules.parkingFacilityGates.getParkingFacilityGates,
    getParkingFacilityGateById: modules.parkingFacilityGates.getParkingFacilityGateById,
    getParkingFacilityGateByFacilityId: modules.parkingFacilityGates.getParkingFacilityGateByFacilityId,
    postCreateParkingFacilityGate: modules.parkingFacilityGates.postCreateParkingFacilityGate,
    patchUpdateParkingFacilityGate: modules.parkingFacilityGates.patchUpdateParkingFacilityGate,
    deleteParkingFacilityGate: modules.parkingFacilityGates.deleteParkingFacilityGate,
    
    // Parking Facility Gate Lanes
    getParkingFacilityGateLanes: modules.parkingFacilityGateLanes.getParkingFacilityGateLanes,
    getParkingFacilityGateLanesByGateId: modules.parkingFacilityGateLanes.getParkingFacilityGateLanesByGateId,
    postCreateParkingFacilityGateLane: modules.parkingFacilityGateLanes.postCreateParkingFacilityGateLane,
    patchUpdateParkingFacilityGateLane: modules.parkingFacilityGateLanes.patchUpdateParkingFacilityGateLane,
    deleteParkingFacilityGateLane: modules.parkingFacilityGateLanes.deleteParkingFacilityGateLane,
    
    // Devices
    getEdgeServers: modules.edgeServer.getEdgeServers,
    getEdgeServerById: modules.edgeServer.getEdgeServerById,
    postCreateEdgeServer: modules.edgeServer.postCreateEdgeServer,
    patchUpdateEdgeServer: modules.edgeServer.patchUpdateEdgeServer,
    deleteEdgeServer: modules.edgeServer.deleteEdgeServer,
    
    getCameras: modules.camera.getCameras,
    getCameraById: modules.camera.getCameraById,
    postCreateCamera: modules.camera.postCreateCamera,
    patchUpdateCamera: modules.camera.patchUpdateCamera,
    deleteCamera: modules.camera.deleteCamera,
    
    getFailoverGroups: modules.failoverGroup.getFailoverGroups,
    getFailoverGroupById: modules.failoverGroup.getFailoverGroupById,
    postCreateFailoverGroup: modules.failoverGroup.postCreateFailoverGroup,
    patchUpdateFailoverGroup: modules.failoverGroup.patchUpdateFailoverGroup,
    deleteFailoverGroup: modules.failoverGroup.deleteFailoverGroup,

    getFailoverGroupMembers: modules.failoverGroupMember.getFailoverGroupMembers,
    getFailoverGroupMembersById: modules.failoverGroupMember.getFailoverGroupMembersById,
    postCreateFailoverGroupMember: modules.failoverGroupMember.postCreateFailoverGroupMember,
    patchUpdateFailoverGroup: modules.failoverGroupMember.patchUpdateFailoverGroupMember,
    deleteFailoverGroupMember: modules.failoverGroupMember.deleteFailoverGroupMember
  };
};

// 匯出 axios 實例以保持相容性
export { instance } from './api/axios';


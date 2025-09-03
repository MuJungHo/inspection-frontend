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
export const api = (logout = () => { }) => {
  return {
    auth: wrapApiModule(apiModules.authApi, logout),
    user: wrapApiModule(apiModules.userApi, logout),
    authorization: wrapApiModule(apiModules.authorizationApi, logout),
    role: wrapApiModule(apiModules.roleApi, logout),
    roleAttribute: wrapApiModule(apiModules.roleAttributeApi, logout),
    userAttribute: wrapApiModule(apiModules.userAttributeApi, logout),
    regions: wrapApiModule(apiModules.regionsApi, logout),
    parkingFacilities: wrapApiModule(apiModules.parkingFacilitiesApi, logout),
    parkingFacilityGates: wrapApiModule(apiModules.parkingFacilityGatesApi, logout),
    parkingFacilityGateLanes: wrapApiModule(apiModules.parkingFacilityGateLanesApi, logout),
    parkingFloors: wrapApiModule(apiModules.parkingFloorApi, logout),
    parkingOccupancys: wrapApiModule(apiModules.parkingOccupancyApi, logout),
    record: wrapApiModule(apiModules.recordApi, logout),
    vehicle: wrapApiModule(apiModules.vehicleApi, logout),
    edgeServer: wrapApiModule(apiModules.edgeServerApi, logout),
    camera: wrapApiModule(apiModules.cameraApi, logout),
    failoverGroup: wrapApiModule(apiModules.failoverGroupApi, logout),
    failoverGroupMember: wrapApiModule(apiModules.failoverGroupMemberApi, logout),
    failoverEvent: wrapApiModule(apiModules.failoverEventApi, logout),
    plc: wrapApiModule(apiModules.plcApi, logout),
    plcPoint: wrapApiModule(apiModules.plcPointApi, logout),
    systemSetting: wrapApiModule(apiModules.systemsettingApi, logout),
  };
};

// 向後相容性 - 保留原有的扁平化結構
export const compatibleApi = (logout = () => { }) => {
  const modules = api(logout);

  return {
    // Auth (更新 API 路徑)
    postAuthLogin: modules.auth.postAuthLogin,

    // Users (新版 API + 保持舊版相容性)
    getUsers: modules.user.getUsers,
    getUserById: modules.user.getUserById,
    postAddUser: modules.user.postAddUser,
    putUpdateUser: modules.user.putUpdateUser,
    deleteUser: modules.user.deleteUser,
    getUserList: modules.user.getUserList, // 向後相容
    postCreateUser: modules.user.postCreateUser, // 向後相容

    // Authorization
    getAuthorizations: modules.authorization.getAuthorizations,
    getAuthorizationNames: modules.authorization.getAuthorizationNames,
    getAuthorizationsByName: modules.authorization.getAuthorizationsByName,
    getAuthorizationById: modules.authorization.getAuthorizationById,
    postAddAuthorization: modules.authorization.postAddAuthorization,
    putUpdateAuthorization: modules.authorization.putUpdateAuthorization,
    deleteAuthorization: modules.authorization.deleteAuthorization,

    // Role
    getRoles: modules.role.getRoles,
    getRoleById: modules.role.getRoleById,
    postAddRole: modules.role.postAddRole,
    putUpdateRole: modules.role.putUpdateRole,
    deleteRole: modules.role.deleteRole,

    // Role Attribute
    getRoleAttributes: modules.roleAttribute.getRoleAttributes,
    getRoleAttributeById: modules.roleAttribute.getRoleAttributeById,
    postAddRoleAttribute: modules.roleAttribute.postAddRoleAttribute,
    putUpdateRoleAttribute: modules.roleAttribute.putUpdateRoleAttribute,
    deleteRoleAttribute: modules.roleAttribute.deleteRoleAttribute,

    // User Attribute
    getUserAttributes: modules.userAttribute.getUserAttributes,
    getUserAttributeById: modules.userAttribute.getUserAttributeById,
    postAddUserAttribute: modules.userAttribute.postAddUserAttribute,
    putUpdateUserAttribute: modules.userAttribute.putUpdateUserAttribute,
    deleteUserAttribute: modules.userAttribute.deleteUserAttribute,

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
    getEdgeServerHistories: modules.edgeServer.getEdgeServerHistories,
    getEdgeServerById: modules.edgeServer.getEdgeServerById,
    postCreateEdgeServer: modules.edgeServer.postCreateEdgeServer,
    patchUpdateEdgeServer: modules.edgeServer.patchUpdateEdgeServer,
    deleteEdgeServer: modules.edgeServer.deleteEdgeServer,
    putEdgeServerAppSecretRenew: modules.edgeServer.putEdgeServerAppSecretRenew,
    

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
    patchUpdateFailoverGroupMember: modules.failoverGroupMember.patchUpdateFailoverGroupMember,
    deleteFailoverGroupMember: modules.failoverGroupMember.deleteFailoverGroupMember,

    getFailoverEventsByGroupId: modules.failoverEvent.getFailoverEventsByGroupId,

    // PLC
    getPLCs: modules.plc.getPLCs,
    getPLCById: modules.plc.getPLCById,
    getPLCByGateId: modules.plc.getPLCByGateId,
    postCreatePLC: modules.plc.postCreatePLC,
    patchUpdatePLC: modules.plc.patchUpdatePLC,
    deletePLC: modules.plc.deletePLC,

    // PLC Point
    getPLCPoints: modules.plcPoint.getPLCPoints,
    getPLCPointById: modules.plcPoint.getPLCPointById,
    getPLCPointByPLCId: modules.plcPoint.getPLCPointByPLCId,
    postCreatePLCPoint: modules.plcPoint.postCreatePLCPoint,
    patchUpdatePLCPoint: modules.plcPoint.patchUpdatePLCPoint,
    deletePLCPoint: modules.plcPoint.deletePLCPoint,

    getAbnormalRecordInstants: modules.record.getAbnormalRecordInstants,
    getUsageRecordInstants: modules.record.getUsageRecordInstants,
  };
};

// 匯出 axios 實例以保持相容性
export { instance } from './api/axios';


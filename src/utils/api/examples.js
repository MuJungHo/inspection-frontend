// API 使用範例

import { api, compatibleApi } from '../utils/apis';

// 範例 1: 新的模組化方式 (推薦)
const useApiExample = () => {
  const { authedApi } = useContext(GlobalContext);
  
  // 驗證相關
  const handleLogin = async () => {
    try {
      const result = await authedApi.auth.postAuthLogin({
        data: { username: 'admin', password: 'admin' }
      });
      console.log('登入成功:', result);
    } catch (error) {
      console.error('登入失敗:', error);
    }
  };
  
  // 區域管理
  const handleGetRegions = async () => {
    try {
      const regions = await authedApi.regions.getRegions();
      console.log('區域清單:', regions);
    } catch (error) {
      console.error('取得區域清單失敗:', error);
    }
  };
  
  // 停車設施管理
  const handleGetParkingFacilities = async () => {
    try {
      const facilities = await authedApi.parkingFacilities.getParkingFacilities();
      console.log('停車設施清單:', facilities);
    } catch (error) {
      console.error('取得停車設施清單失敗:', error);
    }
  };
  
  // 設備管理
  const handleGetEdgeServers = async () => {
    try {
      const servers = await authedApi.edgeServer.getEdgeServers();
      console.log('EdgeServer 清單:', servers);
    } catch (error) {
      console.error('取得 EdgeServer 清單失敗:', error);
    }
  };
};

// 範例 2: 向後相容方式 (現有程式碼可繼續使用)
const useCompatibleApiExample = () => {
  const { legacyApi } = useContext(GlobalContext);
  
  // 原有的使用者管理功能仍可正常使用
  const handleGetUsers = async () => {
    try {
      const users = await legacyApi.getUserList();
      console.log('使用者清單:', users);
    } catch (error) {
      console.error('取得使用者清單失敗:', error);
    }
  };
  
  // 新的 API 也可以通過扁平化介面使用
  const handleGetRegionsCompatible = async () => {
    try {
      const regions = await legacyApi.getRegions();
      console.log('區域清單:', regions);
    } catch (error) {
      console.error('取得區域清單失敗:', error);
    }
  };
};

// 範例 3: 單獨引用方式 (特殊需求時)
import { regionsApi } from '../utils/api/prod/regions';
import { regionsApi as mockRegionsApi } from '../utils/api/mock/regions';

const useDirectApiExample = () => {
  // 直接使用生產環境 API
  const handleGetRegionsDirect = async () => {
    try {
      const regions = await regionsApi.getRegions();
      console.log('區域清單:', regions);
    } catch (error) {
      console.error('取得區域清單失敗:', error);
    }
  };
  
  // 直接使用 Mock API
  const handleGetRegionsMock = async () => {
    try {
      const regions = await mockRegionsApi.getRegions();
      console.log('Mock 區域清單:', regions);
    } catch (error) {
      console.error('取得 Mock 區域清單失敗:', error);
    }
  };
};

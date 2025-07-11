import { dummyUserList } from '../../constant';

// Mock 使用者相關 API (保持與現有程式碼的相容性)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userApi = {
  // 取得使用者清單
  getUserList: async (params = {}) => {
    await delay(300);
    return dummyUserList;
  },
  
  // 新增使用者
  postCreateUser: async ({ data }) => {
    await delay(500);
    const newUser = { ...data, id: Date.now() };
    return { success: true, data: newUser };
  },
  
  // 修改使用者
  putUpdateUser: async ({ data, ...rest }) => {
    await delay(500);
    return { success: true, data: { ...data, ...rest } };
  },
  
  // 刪除使用者
  deleteUser: async ({ ...rest }) => {
    await delay(500);
    return { success: true, ...rest };
  }
};

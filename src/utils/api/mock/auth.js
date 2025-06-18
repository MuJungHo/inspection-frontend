// Mock 驗證相關 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  // 登入
  postAuthLogin: async ({ data }) => {
    await delay(500);
    if (data.username === 'admin' && data.password === 'admin') {
      return { 
        token: 'mock-jwt-token-' + Date.now(),
        expireAt: new Date(Date.now() + 3600 * 1000).toISOString(),
      };
    }
    throw new Error('使用者名稱或密碼錯誤');
  },
  
  // 驗證 token 有效性
  getTokenValidate: async () => {
    await delay(300);
    return { valid: true };
  }
};

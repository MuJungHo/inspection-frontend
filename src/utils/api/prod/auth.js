import { instance } from '../axios';

// 驗證相關 API
export const authApi = {
  // 登入
  postAuthLogin: async ({ data }) => {
    let { username, password } = data;
    return await instance.post('/authn/v1/auth', { username, password, method: 'LocalAuthn' });
  },
  
  // 驗證 token 有效性
  getTokenValidate: async () => {
    return await instance.get('/authn/v1/tokenValidate');
  }
};

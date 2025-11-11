// 環境變數設定
export const config = {
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  apiHost: import.meta.env.VITE_REACT_APP_HOST,
  apiPort: import.meta.env.VITE_REACT_APP_PORT || '',
  apiProtocol: import.meta.env.VITE_REACT_APP_PROTOCOL || 'http',
  apiTimeout: 20000
};

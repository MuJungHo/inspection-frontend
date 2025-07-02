import zh from './zh-TW.json'
import en from './en.json'

// 函式來根據 keySeparator 取得巢狀物件的值
const getNestedValue = (obj, path, separator = '.') => {
  return path.split(separator).reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

export default (locale) => (key, arg = {}, options = {}) => {
  const { keySeparator = '.' } = options;
  
  // console.log(locale)
  const localeData = {
    'zh-TW': zh,
    'en': en
  };
  
  const currentLocaleData = localeData[locale];
  if (!currentLocaleData) return key;
  
  // 嘗試直接查詢 key（保持向後相容性）
  let result = currentLocaleData[key];
  
  // 如果直接查詢失敗且包含分隔符號，則嘗試巢狀查詢
  if (result === undefined && key.includes(keySeparator)) {
    result = getNestedValue(currentLocaleData, key, keySeparator);
  }
  
  if (result === undefined) return key;
  
  // 處理變數替換
  if (Object.keys(arg).length > 0) {
    for (let i = 0; i < Object.keys(arg).length; i++) {
      const argKey = Object.keys(arg)[i];
      result = result.replace(`{{${argKey}}}`, arg[argKey]);
    }
  }
  
  return result;
}
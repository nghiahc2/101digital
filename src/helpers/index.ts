const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };

export const setObjectToStore = (key: string, value: any) => {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
};

export const getObjectFromStore = (key: string) => {
  const stringValue = localStorage.getItem(key);
  if (stringValue) {
    return JSON.parse(stringValue);
  }
  return null;
};

export const getValueFromStore = (key: string) => {
  return localStorage.getItem(key);
};

export const removeObjectFromStore = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStore = () => {
  localStorage.clear();
};

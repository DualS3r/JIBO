export const saveLocalStorageItem = (name, item) => {
  localStorage.setItem(name, item);
};

export const getLocalStorage = (name) => {
  return localStorage.getItem(name);
};

export const delLocalStorage = (name) => {
  localStorage.removeItem(name);
};

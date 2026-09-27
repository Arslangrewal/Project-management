import {
  saveToStorage,
  getFromStorage,
} from "./storageService";

export const saveSettings = (
  settings
) => {
  saveToStorage(
    "settings",
    settings
  );
};

export const getSettings = () => {
  return getFromStorage(
    "settings"
  );
};
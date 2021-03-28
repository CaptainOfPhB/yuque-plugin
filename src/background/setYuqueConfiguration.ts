import { Yuque_Config, Basic_Config, Menu_Config } from '@/config/defaultConfig';

chrome.storage.sync.get(function (store) {
  if (!Object.keys(store).length) {
    chrome.storage.sync.set({
      yuqueConfig: Yuque_Config,
      basicConfig: Basic_Config,
      menuConfig: Menu_Config
    });
  }
});

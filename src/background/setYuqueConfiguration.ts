import { Yuque_Config, Basic_Config, Menu_Config } from '@/config/defaultConfig';

chrome.storage.sync.clear(function () {
  console.info('Yuque configuration has been cleared.');
  chrome.storage.sync.set(
    { yuqueConfig: Yuque_Config, basicConfig: Basic_Config, menuConfig: Menu_Config },
    function () {
      console.info('Yuque configuration has been successfully saved as "yuqueConfig".');
    }
  );
});

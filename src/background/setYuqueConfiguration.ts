import defaultConfig from '@/config/defaultConfig';

chrome.storage.local.clear(function () {
  console.info('Yuque configuration has been cleared.');
  chrome.storage.local.set({ yuqueConfig: defaultConfig }, function () {
    console.info('Yuque configuration has been successfully saved as "yuqueConfig".');
  });
});

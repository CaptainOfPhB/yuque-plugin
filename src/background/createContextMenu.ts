import Menu from '@/config/menu';
import { Type } from '@/interface';
import handleContextMenuClick from '@/background/handleContextMenuClick';

// remove menu first if created
// reference: https://stackoverflow.com/a/37000388
chrome.runtime.onInstalled.addListener(function removeContextMenu() {
  chrome.contextMenus.removeAll(function createContextMenu() {
    chrome.contextMenus.create({
      id: 'yuque-plugin',
      contexts: ['all'],
      title: 'Yuque plugin - 语雀插件'
    });

    for (const item of Menu) {
      chrome.contextMenus.create({
        id: item.type,
        title: item.title,
        contexts: item.contexts,
        parentId: 'yuque-plugin'
      });
    }

    chrome.contextMenus.create({
      id: 'separator',
      type: 'separator',
      parentId: 'yuque-plugin'
    });

    chrome.contextMenus.create({
      id: Type.Setting,
      title: '设置插件',
      contexts: ['all'],
      parentId: 'yuque-plugin'
    });

    chrome.contextMenus.create({
      id: Type.Feedback,
      title: '帮助及反馈',
      contexts: ['all'],
      parentId: 'yuque-plugin'
    });

    chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
  });
});

import Menu from '@/config/menu';
import { MessageOfRequestCreateContextMenu, Type } from '@/interface';

chrome.runtime.onMessage.addListener(function dynamicallyCreateContextMenu(message: MessageOfRequestCreateContextMenu) {
  if (message.action !== 'createContextMenu') return;

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
        parentId: 'yuque-plugin',
        visible: item.onlyRunOnYuquePage ? message.isYuquePage : true
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

    if (!chrome.contextMenus.onClicked.hasListeners()) {
      chrome.contextMenus.onClicked.addListener(function sendMessage(info, tab) {
        const type = info.menuItemId as Type;
        chrome.tabs.sendMessage(tab!.id!, { type });
      });
    }
  });
});

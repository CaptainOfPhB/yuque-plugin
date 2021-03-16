import Menu from '@/config/menu';
import { RequestCreateContextMenu, Type } from '@/interface';

chrome.runtime.onMessage.addListener(function messageListener(
  message: RequestCreateContextMenu,
  _sender,
  sendResponse
) {
  if (message.action === 'createContextMenu') {
    chrome.contextMenus.removeAll(function createContextMenu() {
      chrome.contextMenus.create({
        id: 'yuque-plugin',
        contexts: ['all'],
        title: 'Yuque plugin - 语雀插件'
      });

      Menu.forEach((item, index) => {
        if (item.type === Type.Separator) {
          chrome.contextMenus.create({
            type: 'separator',
            id: 'separator' + index,
            parentId: 'yuque-plugin'
          });
        } else {
          chrome.contextMenus.create({
            id: item.type,
            title: item.title,
            contexts: item.contexts,
            parentId: 'yuque-plugin',
            visible: item.onlyRunOnYuquePage ? message.isYuquePage : true
          });
        }
      });

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
          console.log('yuque-plugin: trigger click event');
          const type = info.menuItemId as Type;
          chrome.tabs.sendMessage(tab!.id!, { type, info });
        });
      }
    });
  }

  sendResponse();
});

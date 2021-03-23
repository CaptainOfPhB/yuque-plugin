import Menu from '@/config/menu';

import Tab = chrome.tabs.Tab;
import MessageSender = chrome.runtime.MessageSender;
import OnClickData = chrome.contextMenus.OnClickData;
import { MenuItem, RequestCreateContextMenu, Type } from '@/interface';

chrome.runtime.onMessage.addListener(function messageListener(
  request: RequestCreateContextMenu,
  _sender: MessageSender,
  sendResponse
) {
  if (request.action === 'createContextMenu') {
    chrome.contextMenus.removeAll(function createContextMenu() {
      chrome.contextMenus.create({
        id: 'yuque-plugin',
        contexts: ['all'],
        title: 'Yuque plugin - 语雀插件'
      });

      Menu.forEach((item: MenuItem, index: number) => {
        if (item.type === Type.Separator) {
          chrome.contextMenus.create({
            contexts: ['all'],
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
            visible: item.onlyRunOnYuquePage ? request.isYuquePage : true
          });
        }
      });
    });
  }

  sendResponse();
});

chrome.contextMenus.onClicked.addListener(function sendMessage(info: OnClickData, tab: Tab | undefined) {
  const type = info.menuItemId as Type;
  chrome.tabs.sendMessage(tab!.id!, { type, info });
});

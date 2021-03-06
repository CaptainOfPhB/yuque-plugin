import store from '@/store';
import ContextMenu from '@/config/contextMenu';

import Tab = chrome.tabs.Tab;
import MessageSender = chrome.runtime.MessageSender;
import OnClickData = chrome.contextMenus.OnClickData;
import { MenuItem, RequestCreateContextMenu, Type, TypeDescription } from '@/interface';

if (!chrome.runtime.onMessage.hasListener(messageListener)) {
  chrome.runtime.onMessage.addListener(messageListener);
}

if (!chrome.contextMenus.onClicked.hasListener(onClickedCallback)) {
  chrome.contextMenus.onClicked.addListener(onClickedCallback);
}

async function messageListener(request: RequestCreateContextMenu, _sender: MessageSender, sendResponse: () => void) {
  if (request.action === 'createContextMenu') {
    const menu = await store.get<Record<string, boolean>>('menuConfig');
    if (!menu) return;

    chrome.contextMenus.removeAll(function createContextMenu() {
      chrome.contextMenus.create({
        id: 'yuque-plugin',
        contexts: ['all'],
        title: 'Yuque plugin - 语雀插件'
      });

      ContextMenu.forEach((item: MenuItem, index: number) => {
        if (item.type === Type.Separator) {
          chrome.contextMenus.create({
            contexts: ['all'],
            type: 'separator',
            id: 'separator' + index,
            parentId: 'yuque-plugin'
          });
        } else {
          if (menu[item.type]) {
            chrome.contextMenus.create({
              id: item.type,
              contexts: item.contexts,
              parentId: 'yuque-plugin',
              title: TypeDescription[item.type],
              visible: item.onlyRunOnYuquePage ? request.isYuquePage : true
            });
          }
        }
      });

      chrome.contextMenus.create({
        id: 'separator',
        contexts: ['all'],
        type: 'separator',
        parentId: 'yuque-plugin'
      });

      chrome.contextMenus.create({
        id: Type.Setting,
        contexts: ['all'],
        parentId: 'yuque-plugin',
        title: TypeDescription.Setting
      });

      chrome.contextMenus.create({
        id: Type.Help,
        contexts: ['all'],
        parentId: 'yuque-plugin',
        title: TypeDescription.Help
      });
    });
  }

  sendResponse();
}

function onClickedCallback(info: OnClickData, tab: Tab | undefined) {
  const type = info.menuItemId as Type;
  chrome.tabs.sendMessage(tab!.id!, { type, info });
}

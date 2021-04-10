import MessageSender = chrome.runtime.MessageSender;
import { RequestOpenMindMapPage } from '@/interface';

if (!chrome.runtime.onMessage.hasListener(messageListener)) {
  chrome.runtime.onMessage.addListener(messageListener);
}

function messageListener(request: RequestOpenMindMapPage, _sender: MessageSender, sendResponse: () => void) {
  if (request.action === 'openMindMapPage') {
    chrome.tabs.create({ url: chrome.runtime.getURL('mindmap.html') });
  }

  sendResponse();
}

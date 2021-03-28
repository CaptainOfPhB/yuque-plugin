import MessageSender = chrome.runtime.MessageSender;
import { RequestOpenOptionsPage } from '@/interface';

if (!chrome.runtime.onMessage.hasListener(messageListener)) {
  chrome.runtime.onMessage.addListener(messageListener);
}

function messageListener(request: RequestOpenOptionsPage, _sender: MessageSender, sendResponse: () => void) {
  if (request.action === 'openOptionsPage') {
    chrome.runtime.openOptionsPage();
  }

  sendResponse();
}

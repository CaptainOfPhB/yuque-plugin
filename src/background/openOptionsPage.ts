import MessageSender = chrome.runtime.MessageSender;
import { RequestOpenOptionsPage } from '@/interface';

chrome.runtime.onMessage.addListener(function messageListener(
  request: RequestOpenOptionsPage,
  _sender: MessageSender,
  sendResponse
) {
  if (request.action === 'openOptionsPage') {
    chrome.tabs.create({ url: '/options.html' });
  }

  sendResponse();
});

import MessageSender = chrome.runtime.MessageSender;
import { RequestOpenGitHubPage } from '@/interface';

if (!chrome.runtime.onMessage.hasListener(messageListener)) {
  chrome.runtime.onMessage.addListener(messageListener);
}

function messageListener(request: RequestOpenGitHubPage, _sender: MessageSender, sendResponse: () => void) {
  if (request.action === 'openGitHubPage') {
    window.open('https://github.com/CaptainOfPhB/yuque-plugin');
  }

  sendResponse();
}

import { Type } from '@/interface';
import MessageSender = chrome.runtime.MessageSender;
import OnClickData = chrome.contextMenus.OnClickData;
import { copyUrl, copyImage, viewMarkdown } from '@/actions';

chrome.runtime.onMessage.addListener(function handleContextMenuClick(
  request: { type: Type; info: OnClickData },
  _sender: MessageSender,
  sendResponse
) {
  console.log('yuque-plugin: receive message');

  switch (request.type) {
    case Type.Url:
      copyUrl();
      break;
    case Type.Image:
      copyImage(request.info);
      break;
    case Type.Markdown:
      viewMarkdown();
      break;
  }

  sendResponse();
});

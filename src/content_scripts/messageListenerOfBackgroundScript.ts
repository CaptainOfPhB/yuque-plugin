import MessageSender = chrome.runtime.MessageSender;
import { RequestFromBackgroundScript, Type } from '@/interface';

import { copyUrl, copyImage, viewMarkdown } from '@/actions';

chrome.runtime.onMessage.addListener(function handleContextMenuClick(
  request: RequestFromBackgroundScript,
  _sender: MessageSender,
  sendResponse
) {
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

import MessageSender = chrome.runtime.MessageSender;
import { RequestFromBackgroundScript, Type } from '@/interface';

import { copyUrl, copyLink, copyImage, viewMarkdown } from '@/actions';

chrome.runtime.onMessage.addListener(async function handleContextMenuClick(
  request: RequestFromBackgroundScript,
  _sender: MessageSender,
  sendResponse
) {
  switch (request.type) {
    case Type.Url:
      copyUrl();
      break;
    case Type.Link:
      await copyLink(request.info);
      break;
    case Type.Image:
      await copyImage(request.info);
      break;
    case Type.Markdown:
      viewMarkdown();
      break;
  }

  sendResponse();
});

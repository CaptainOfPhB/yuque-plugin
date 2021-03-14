import Noty from 'noty';
import { RequestHandler, Type } from '@/interface';
import { copyUrl, viewMarkdown } from '@/actions';
import { getUrlOfCurrentTab } from '@/helper';
import MessageSender = chrome.runtime.MessageSender;

new Noty({
  text: 'duck'
}).show();

chrome.runtime.onMessage.addListener(async function contextMenu(
  request: RequestHandler,
  _sender: MessageSender,
  sendResponse
) {
  if (request.disabled) return;

  const response: unknown | undefined = undefined;

  switch (request.type) {
    case Type.Url:
      await copyUrl();
      break;
    case Type.Markdown: {
      const pageUrl = await getUrlOfCurrentTab();
      viewMarkdown(pageUrl);
    }
  }

  if (sendResponse) {
    sendResponse(response);
  }
});

import { RequestHandler, Type } from '@/interface';

import { copyUrl, viewMarkdown } from '@/actions';

chrome.runtime.onMessage.addListener(function (request: RequestHandler, _sender, sendResponse) {
  if (request.disabled) return;

  const response: unknown | undefined = undefined;

  switch (request.type) {
    case Type.Url:
      copyUrl();
      break;
    case Type.Markdown:
      viewMarkdown();
      break;
  }

  if (sendResponse) {
    sendResponse(response);
  }
});

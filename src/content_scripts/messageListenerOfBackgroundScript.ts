import { Type } from '@/interface';
import { copyUrl, viewMarkdown } from '@/actions';

chrome.runtime.onMessage.addListener(function handleContextMenuClick(request: { type: Type }, _sender, sendResponse) {
  console.log('yuque-plugin: receive message');

  switch (request.type) {
    case Type.Url:
      copyUrl();
      break;
    case Type.Markdown:
      viewMarkdown();
      break;
  }

  sendResponse();
});

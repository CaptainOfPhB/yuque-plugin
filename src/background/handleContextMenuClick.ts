import { Type } from '@/interface';
import * as actions from '@/actions/contextMenu';

import Tab = chrome.tabs.Tab;
import OnClickData = chrome.contextMenus.OnClickData;

function handleContextMenuClick(info: OnClickData, tab: Tab | undefined) {
  const type = info.menuItemId as Type;
  const url = (tab as Tab).url as string;
  const title = (tab as Tab).title as string;

  // linkUrl, mediaType, srcUrl
  console.log(type, url, title);

  switch (type) {
    case Type.Markdown:
      actions.viewMarkdown(url as string);
      break;
    case Type.Url:
      actions.copyUrl(title, url);
  }
}

export default handleContextMenuClick;

import MessageSender = chrome.runtime.MessageSender;
import { RequestFromBackgroundScript, Type } from '@/interface';

import copyUrl from '@/actions/copyUrl';
import copyLink from '@/actions/copyLink';
import copyImage from '@/actions/copyImage';
import copyBookToc from '@/actions/copyBookToc';
import copyDocToc from '@/actions/copyDocToc';
import viewHTML from '@/actions/viewHTML';
import viewMarkdown from '@/actions/viewMarkdown';
import insertRandomImage from '@/actions/insertRandomImage';
import openOptionsPage from '@/actions/openOptionsPage';
import insertTooltip from '@/actions/insertTooltip';

chrome.runtime.onMessage.addListener(async function handleContextMenuClick(
  request: RequestFromBackgroundScript,
  _sender: MessageSender,
  sendResponse
) {
  switch (request.type) {
    case Type.CopyUrl:
      await copyUrl();
      break;
    case Type.CopyLink:
      await copyLink(request.info);
      break;
    case Type.CopyImage:
      await copyImage(request.info);
      break;
    case Type.CopyBookToc:
      await copyBookToc();
      break;
    case Type.CopyDocToc:
      await copyDocToc();
      break;
    case Type.ViewMarkdown:
      await viewMarkdown();
      break;
    case Type.ViewHTML:
      await viewHTML();
      break;
    case Type.InsertRandomImage:
      await insertRandomImage();
      break;
    case Type.InsertTooltip:
      insertTooltip();
      break;
    case Type.Setting:
      openOptionsPage();
      break;
  }

  sendResponse();
});

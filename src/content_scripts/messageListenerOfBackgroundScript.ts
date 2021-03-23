import MessageSender = chrome.runtime.MessageSender;
import { RequestFromBackgroundScript, Type } from '@/interface';

import copyUrl from '@/actions/copyUrl';
import copyLink from '@/actions/copyLink';
import viewHTML from '@/actions/viewHTML';
import copyImage from '@/actions/copyImage';
import viewMarkdown from '@/actions/viewMarkdown';
import insertRandomImage from '@/actions/insertRandomImage';
import indentTheFirstLineOfParagraph from '@/actions/indentTheFirstLineOfParagraph';

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
    case Type.ViewMarkdown:
      viewMarkdown();
      break;
    case Type.ViewHTML:
      viewHTML();
      break;
    case Type.InsertRandomImage:
      insertRandomImage();
      break;
    case Type.Indent:
      indentTheFirstLineOfParagraph();
      break;
  }

  sendResponse();
});

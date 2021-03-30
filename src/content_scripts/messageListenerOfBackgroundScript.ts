import MessageSender = chrome.runtime.MessageSender;
import { RequestFromBackgroundScript, Type } from '@/interface';

import copyUrl from '@/actions/copyUrl';
import copyLink from '@/actions/copyLink';
import copyDirectory from '@/actions/copyDirectory';
import copyImage from '@/actions/copyImage';
import viewHTML from '@/actions/viewHTML';
import viewMarkdown from '@/actions/viewMarkdown';
import insertRandomImage from '@/actions/insertRandomImage';
import indentTheFirstLineOfParagraph from '@/actions/indentTheFirstLineOfParagraph';
import openOptionsPage from '@/actions/openOptionsPage';

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
    case Type.CopyDirectory:
      copyDirectory();
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
    case Type.Indent:
      await indentTheFirstLineOfParagraph();
      break;
    case Type.Setting:
      openOptionsPage();
      break;
  }

  sendResponse();
});

import { copyToClipboard } from '@/helper';
import OnClickData = chrome.contextMenus.OnClickData;

/**
 * Copy the image url to markdown format
 * @returns {Promise<string>}
 */
function copyImage(info: OnClickData): void {
  copyToClipboard(`![image](${info.srcUrl})`);
  new Noty({
    type: 'success',
    text: '已复制图片链接至粘贴板！'
  }).show();
}

export default copyImage;

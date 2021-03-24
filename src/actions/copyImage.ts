import OnClickData = chrome.contextMenus.OnClickData;
import copyToClipboard from '@/helper/copyToClipboard';

/**
 * Copy the image url to markdown format
 * @param {chrome.contextMenus.OnClickData} info
 * @returns {Promise<void>}
 */
async function copyImage(info: OnClickData): Promise<void> {
  const markdownLink = `![image](${info.srcUrl})`;
  await copyToClipboard(markdownLink, '图片链接');
}

export default copyImage;

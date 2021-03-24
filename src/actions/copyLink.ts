import OnClickData = chrome.contextMenus.OnClickData;
import copyToClipboard from '@/helper/copyToClipboard';

/**
 * Copy the link address to markdown format
 * @param {chrome.contextMenus.OnClickData} info
 * @returns {Promise<void>}
 */
async function copyLink(info: OnClickData): Promise<void> {
  const markdownLink = `[${info.selectionText}](${info.linkUrl})`;
  await copyToClipboard(markdownLink, '链接地址');
}

export default copyLink;

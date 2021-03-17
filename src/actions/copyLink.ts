import OnClickData = chrome.contextMenus.OnClickData;

/**
 * Copy the link address to markdown format
 * @param {chrome.contextMenus.OnClickData} info
 * @returns {Promise<void>}
 */
async function copyLink(info: OnClickData): Promise<void> {
  const markdownLink = `[${info.selectionText}](${info.linkUrl})`;
  await navigator.clipboard.writeText(markdownLink);
  new Noty({
    type: 'success',
    text: '已复制链接地址至粘贴板！'
  }).show();
}

export default copyLink;

import OnClickData = chrome.contextMenus.OnClickData;

/**
 * Copy the image url to markdown format
 * @param {chrome.contextMenus.OnClickData} info
 * @returns {Promise<void>}
 */
async function copyImage(info: OnClickData): Promise<void> {
  const markdownLink = `![image](${info.srcUrl})`;
  await navigator.clipboard.writeText(markdownLink);
  new Noty({
    type: 'success',
    text: '已复制图片链接至粘贴板！'
  }).show();
}

export default copyImage;

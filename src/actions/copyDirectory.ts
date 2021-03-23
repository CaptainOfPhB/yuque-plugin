import OnClickData = chrome.contextMenus.OnClickData;
import isDirectoryPage from '@/helper/isDirectoryPage';

/**
 * Copy the directory of book
 * @param {chrome.contextMenus.OnClickData} info
 * @returns {Promise<void>}
 */
async function copyDirectory(info: OnClickData): Promise<void> {
  if (!isDirectoryPage()) {
    return new Noty({
      type: 'error',
      text: '该功能只可在知识库的目录编排页使用！'
    }).show();
  }
  const markdownLink = `![image](${info.srcUrl})`;
  await navigator.clipboard.writeText(markdownLink);
  new Noty({
    type: 'success',
    text: '已复制图片链接至粘贴板！'
  }).show();
}

export default copyDirectory;

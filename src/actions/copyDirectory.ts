import { message } from 'antd';
import OnClickData = chrome.contextMenus.OnClickData;
import copyToClipboard from '@/helper/copyToClipboard';
import isDirectoryPage from '@/helper/isDirectoryPage';

/**
 * Copy the directory of book
 * @param {chrome.contextMenus.OnClickData} info
 * @returns {Promise<void>}
 */
async function copyDirectory(info: OnClickData): Promise<void> {
  if (!isDirectoryPage()) {
    return message.error('该功能只可在知识库的目录编排页使用！');
  }
  const markdownLink = `![image](${info.srcUrl})`;
  await copyToClipboard(markdownLink, '图片链接');
}

export default copyDirectory;

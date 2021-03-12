import copyToClipboard from '@/helper/copyToClipboard';
import getMarkdownUrlOfCurrentTab from '@/helper/getMarkdonUrlOfCurrentTab';

/**
 * View markdown structure of yuque article page
 * @return {Promise<void>}
 */
export async function viewMarkdown(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const [url] = tab.url!.split('/edit');
  window.open(url.concat('/markdown?plain=true&linebreak=false&anchor=false'), '_blank');
}

/**
 * Copy the current page url to markdown format
 * @returns {Promise<string>}
 */
export async function copyUrl(): Promise<void> {
  const text = await getMarkdownUrlOfCurrentTab();
  copyToClipboard(text);
  chrome.notifications.create({
    type: 'basic',
    message: text,
    title: '已复制 URL 到粘贴板',
    iconUrl: './images/yuque_128.png'
  });
}

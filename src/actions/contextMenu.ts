import copyToClipboard from '@/helper/copyToClipboard';

/**
 * View markdown structure of yuque article page
 * @param {string} pageUrl - Page url
 * @return {Promise<void>}
 */
export function viewMarkdown(pageUrl: string) {
  const [url] = pageUrl.split('/edit');
  window.open(url.concat('/markdown?plain=true&linebreak=false&anchor=false'), '_blank');
}

export function copyUrl(title: string, url: string) {
  const markdown = `[${title}](${url})`;
  copyToClipboard(markdown);
  chrome.notifications.create({
    type: 'basic',
    message: markdown,
    title: '已复制 URL 到粘贴板',
    iconUrl: './images/yuque_128.png'
  });
}

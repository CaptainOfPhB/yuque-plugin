import copyToClipboard from '@/helper/copyToClipboard';
import getMarkdownUrlOfCurrentTab from '@/helper/getMarkdownUrlOfCurrentTab';

/**
 * Copy the current page url to markdown format
 * @returns {Promise<string>}
 */
function copyUrl(): void {
  const markdownLink = getMarkdownUrlOfCurrentTab();
  copyToClipboard(markdownLink);
  new Noty({
    type: 'success',
    text: '已复制页面链接至粘贴板！'
  }).show();
}

export default copyUrl;

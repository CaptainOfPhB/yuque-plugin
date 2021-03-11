import getMarkdownUrlOfCurrentTab from '@/utils/getMarkdonUrlOfCurrentTab';

/**
 * Copy the current page url to markdown format
 * @returns {Promise<string>}
 */
function copyUrl(): void {
  const text = getMarkdownUrlOfCurrentTab();
  console.log(text);
  // chrome.notifications.create({
  //   type: 'basic',
  //   message: text,
  //   title: '已复制 URL 到粘贴板',
  //   iconUrl: './images/yuque_128.png'
  // });
}

export default copyUrl;

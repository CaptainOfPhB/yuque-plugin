import copyToClipboard from '@/helper/copyToClipboard';

/**
 * Copy the current page url to markdown format
 * @returns {Promise<void>}
 */
async function copyUrl(): Promise<void> {
  const markdownLink = `[${document.title}](${location.href})`;
  await copyToClipboard(markdownLink, '页面链接');
}

export default copyUrl;

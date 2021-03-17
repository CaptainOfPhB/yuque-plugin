/**
 * Copy the current page url to markdown format
 * @returns {Promise<void>}
 */
async function copyUrl(): Promise<void> {
  const markdownLink = `[${document.title}](${location.href})`;
  await navigator.clipboard.writeText(markdownLink);
  new Noty({
    type: 'success',
    text: '已复制页面链接至粘贴板！'
  }).show();
}

export default copyUrl;

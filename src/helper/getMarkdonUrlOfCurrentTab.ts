/**
 * Get url of the current tab with markdown format
 * @return {Promise<string>}
 */
async function getMarkdownUrlOfCurrentTab(): Promise<string> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const { url, title } = tab;
  return `[${title}](${url})`;
}

export default getMarkdownUrlOfCurrentTab;

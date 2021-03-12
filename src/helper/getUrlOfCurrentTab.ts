/**
 * Get url of the current tab
 * @return {Promise<string>}
 */
async function getUrlOfCurrentTab(): Promise<string> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // the permissions in manifest.json contain "tabs"
  return tab.url as string;
}

export default getUrlOfCurrentTab;

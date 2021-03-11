async function viewMarkdown(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const [url] = tab.url!.split('/edit');
  window.open(url.concat('/markdown?plain=true&linebreak=false&anchor=false'), '_blank');
}

export default viewMarkdown;

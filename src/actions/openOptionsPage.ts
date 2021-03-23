import { RequestOpenOptionsPage } from '@/interface';

function openOptionsPage() {
  chrome.runtime.sendMessage({ action: 'openOptionsPage' } as RequestOpenOptionsPage);
}

export default openOptionsPage;

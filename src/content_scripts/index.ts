import './overrideNotyConfiguration';
import './messageListenerOfBackgroundScript';

import { isYuquePage } from '@/helper';
import { MessageOfRequestCreateContextMenu } from '@/interface';

// Notify the background.js to update the menu dynamically
chrome.runtime.sendMessage({
  isYuquePage: isYuquePage(),
  action: 'createContextMenu'
} as MessageOfRequestCreateContextMenu);

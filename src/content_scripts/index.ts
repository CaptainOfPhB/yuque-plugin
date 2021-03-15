import './overrideNotyConfiguration';
import './messageListenerOfBackgroundScript';

import { isYuquePage } from '@/helper';
import { RequestCreateContextMenu } from '@/interface';

// Notify the background.js to create context menu dynamically
chrome.runtime.sendMessage({
  isYuquePage: isYuquePage(),
  action: 'createContextMenu'
} as RequestCreateContextMenu);

import './overrideNotyConfiguration';
import './messageListenerOfBackgroundScript';

import isYuquePage from '@/helper/isYuquePage';
import { RequestFromContentScript } from '@/interface';

chrome.runtime.sendMessage({
  isYuquePage: isYuquePage(),
  action: 'createContextMenu'
} as RequestFromContentScript);

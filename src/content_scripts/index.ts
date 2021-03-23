import './overrideNotyConfiguration';
import './messageListenerOfBackgroundScript';

import isYuquePage from '@/helper/isYuquePage';
import { RequestCreateContextMenu } from '@/interface';

chrome.runtime.sendMessage({
  isYuquePage: isYuquePage(),
  action: 'createContextMenu'
} as RequestCreateContextMenu);

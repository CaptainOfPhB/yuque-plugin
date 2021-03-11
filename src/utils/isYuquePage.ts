import getUrlOfCurrentTab from './getUrlOfCurrentTab';

/**
 * True if Yuque page, or false
 * @return {Promise<boolean>}
 */
async function isYuquePage() {
  const url = await getUrlOfCurrentTab();
  return Boolean(url.match('https://www.yuque.com'));
}

export default isYuquePage;

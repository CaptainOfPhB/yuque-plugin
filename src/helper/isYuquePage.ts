/**
 * True if Yuque page, or false
 * @return {boolean}
 */
function isYuquePage() {
  return window.location.href.match('^https://www.yuque.com') !== null;
}

export default isYuquePage;

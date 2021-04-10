/**
 * True if Yuque page, or false
 * @return {boolean}
 */
function isYuquePage() {
  return Boolean(window.location.href.match('^https://www.yuque.com'));
}

export default isYuquePage;

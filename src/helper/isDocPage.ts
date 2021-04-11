/**
 * True if under Yuque doc page, or false
 * @return {boolean}
 */
function isDocPage() {
  return window.location.href.match('^https:\\/\\/www\\.yuque\\.com\\/.+\\/.+\\/.+$') !== null;
}

export default isDocPage;

/**
 * True if under editing on Yuque doc page, or false
 * @return {boolean}
 */
function underEditing() {
  return window.location.href.match('^https:\\/\\/www\\.yuque\\.com\\/.+\\/.+\\/.+\\edit$') !== null;
}

export default underEditing;

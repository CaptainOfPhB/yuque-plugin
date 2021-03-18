/**
 * True if under Yuque article page, or false
 * @return {boolean}
 */
function isArticlePage() {
  const dataValue = document.querySelector('.lark')?.getAttribute('data-testid');
  return !!dataValue && ['reader-main', 'lock-based-doc-editor'].includes(dataValue);
}

export default isArticlePage;

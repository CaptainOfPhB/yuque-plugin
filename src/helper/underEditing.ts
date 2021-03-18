/**
 * True if under editing on Yuque article page, or false
 * @return {boolean}
 */
function underEditing() {
  const dataValue = document.querySelector('.lark')?.getAttribute('data-testid');
  return dataValue === 'lock-based-doc-editor';
}

export default underEditing;

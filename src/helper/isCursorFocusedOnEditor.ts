/**
 * True if the cursor focused on the editor section, or false
 * @returns {boolean}
 */
function isCursorFocusedOnEditor() {
  const selection = document.getSelection();
  if (!selection) {
    return false;
  }
  const focusNode = selection.focusNode;
  const editor = document.querySelector('.lake-content-editor');
  if (!editor) {
    return false;
  }
  return editor.contains(focusNode);
}

export default isCursorFocusedOnEditor;

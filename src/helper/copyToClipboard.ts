/**
 * Copy content to system clipboard
 * @param {string | number} content - you want to copy
 */
function copyToClipboard(content: string | number): void {
  const el = document.createElement('textarea');
  el.style.position = 'fixed';
  el.style.opacity = '0';
  el.value = content.toString();
  document.body.appendChild(el);
  el.select();
  document.execCommand('Copy');
  document.body.removeChild(el);
}

export default copyToClipboard;

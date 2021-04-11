import alert from '@/helper/alert';

/**
 * Try...catch... wrapper for navigator.clipboard
 * @param {string} data
 * @param {string} msg
 * @returns {Promise<void>}
 */
async function copyToClipboard(data: string, msg?: string) {
  try {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(data);
    } else {
      execCopy(data);
    }
    alert.success(`已复制${msg}至粘贴板`);
  } catch {
    try {
      execCopy(data);
      alert.success(`已复制${msg}至粘贴板`);
    } catch (e) {
      console.error(e);
      alert.error(`复制${msg}失败！打开控制台查看原因`);
    }
  }
}

/**
 * Use execCommand method in case of `navigator.clipboard.writeText` is undefined
 * @param {string} data
 */
function execCopy(data: string) {
  const input = document.createElement('input');
  input.value = data;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

export default copyToClipboard;

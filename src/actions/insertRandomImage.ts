import underEditing from '@/helper/underEditing';
import isArticlePage from '@/helper/isArticlePage';
import randomIdentifier from '@/helper/randomIdentifier';
import isCursorFocusedOnEditor from '@/helper/isCursorFocusedOnEditor';

/**
 * Insert an random image from Bing
 */
function insertRandomImage() {
  if (!isArticlePage()) {
    return new Noty({
      type: 'error',
      text: '该功能只可在文档页面使用！'
    }).show();
  }
  if (!underEditing()) {
    return new Noty({
      type: 'error',
      text: '该功能只可在编辑文档时使用！'
    }).show();
  }
  if (!isCursorFocusedOnEditor()) {
    return new Noty({
      type: 'error',
      text: '请将光标聚焦在编辑区后再使用！'
    }).show();
  }

  const p = document.createElement('p');
  p.setAttribute('data-lake-id', randomIdentifier(32));

  const span = document.createElement('span');
  p.classList.add('lake-fontsize-11');

  const img = document.createElement('img');
  img.setAttribute('alt', 'random image from Bing');
  img.setAttribute('src', 'https://bing.ioliu.cn/v1/rand?t=' + new Date().getTime().toString());

  span.appendChild(img);
  p.appendChild(span);

  const focusNode = document.getSelection()!.focusNode;
  const topElement = document.querySelector('.lake-content-editor-core');

  let parentElement = focusNode?.parentElement;
  while (!parentElement?.getAttribute('data-lake-id') && parentElement?.parentElement !== topElement) {
    parentElement = parentElement?.parentElement || null;
  }

  topElement!.insertBefore(p, parentElement.nextSibling);
}

export default insertRandomImage;

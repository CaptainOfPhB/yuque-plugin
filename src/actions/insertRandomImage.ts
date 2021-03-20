import underEditing from '@/helper/underEditing';
import isArticlePage from '@/helper/isArticlePage';
import randomIdentifier from '@/helper/randomIdentifier';
import isCursorFocusedOnEditor from '@/helper/isCursorFocusedOnEditor';

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
  const img = document.createElement('img');
  p.setAttribute('data-lake-id', randomIdentifier(32));
  img.setAttribute('src', 'https://bing.ioliu.cn/v1/rand?t=' + new Date().getTime().toString());
  img.setAttribute('alt', 'random image from Bing');
  p.appendChild(img);

  const focusNode = document.getSelection()!.focusNode;
  let parentElement = focusNode as HTMLElement;
  const topElement = document.querySelector('.lake-content-editor-core');
  while (!parentElement.getAttribute('data-lake-id') && parentElement.parentElement !== topElement) {
    parentElement = parentElement.parentElement!;
  }
  topElement!.insertBefore(p, parentElement.nextSibling);
}

export default insertRandomImage;

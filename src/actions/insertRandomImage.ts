import underEditing from '@/helper/underEditing';
import isArticlePage from '@/helper/isArticlePage';
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

  const selection = document.getSelection()!;
  const parentElement = selection.focusNode!.parentElement!;
  const img = document.createElement('img');
  img.src = 'https://bing.ioliu.cn/v1/rand?t=' + new Date().getTime().toString();
  img.alt = 'random image from Bing';
  parentElement.appendChild(img);
}

export default insertRandomImage;

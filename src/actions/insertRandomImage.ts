import { message } from 'antd';
import underEditing from '@/helper/underEditing';
import isArticlePage from '@/helper/isArticlePage';
import { getUnsplashAccessKey, getRandomPhoto } from '@/service';
import isCursorFocusedOnEditor from '@/helper/isCursorFocusedOnEditor';

/**
 * Insert an random image from Bing
 */
async function insertRandomImage() {
  const { accessKey } = await getUnsplashAccessKey<{ accessKey: string }>();
  const photo = await getRandomPhoto(accessKey);

  console.log(photo);

  if (!isArticlePage()) {
    return message.error('该功能只可在文档页面使用！');
  }
  if (!underEditing()) {
    return message.error('该功能只可在编辑文档时使用！');
  }
  if (!isCursorFocusedOnEditor()) {
    return message.error('请将光标聚焦在编辑区后再使用！');
  }

  const img = document.createElement('img');
  img.setAttribute('alt', 'random image from Bing');
  img.setAttribute('src', 'https://bing.ioliu.cn/v1/rand?t=' + new Date().getTime().toString());

  const focusNode = document.getSelection()!.focusNode;
  const topElement = document.querySelector('.lake-content-editor-core');

  let parentElement = focusNode?.parentElement;
  while (!parentElement?.getAttribute('data-lake-id') && parentElement?.parentElement !== topElement) {
    parentElement = parentElement?.parentElement || null;
  }

  topElement!.insertBefore(img, parentElement.nextSibling);
}

export default insertRandomImage;

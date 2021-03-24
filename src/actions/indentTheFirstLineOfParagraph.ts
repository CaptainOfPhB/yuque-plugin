import { message } from 'antd';
import underEditing from '@/helper/underEditing';
import isArticlePage from '@/helper/isArticlePage';

/**
 * Indent the first line of paragraph with 2em
 */
async function indentTheFirstLineOfParagraph() {
  if (!isArticlePage()) {
    return message.error('该功能只可在文档页面使用！');
  }
  if (!underEditing()) {
    return message.error('该功能只可在编辑文档时使用！');
  }

  const nodeList = document.querySelectorAll<HTMLElement>('.lake-content-editor-core > p');
  if (!nodeList.length) {
    return;
  }
  const pElements = Array.from(nodeList);
  for (const p of pElements) {
    const firstElementChild = p.firstElementChild as HTMLElement;
    firstElementChild ? (firstElementChild.style.paddingLeft = '2em') : (p.style.paddingLeft = '2em');
  }
}

export default indentTheFirstLineOfParagraph;

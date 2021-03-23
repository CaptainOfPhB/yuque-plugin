import underEditing from '@/helper/underEditing';
import isArticlePage from '@/helper/isArticlePage';

/**
 * Indent the first line of paragraph with 2em
 */
function indentTheFirstLineOfParagraph() {
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

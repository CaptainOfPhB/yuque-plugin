import { message } from 'antd';
import underEditing from '@/helper/underEditing';
import randomLakeId from '@/helper/randomLakeId';

function createParagraph() {
  const lakeId = randomLakeId(32);
  const p = document.createElement('p');
  p.setAttribute('data-lake-id', lakeId);
  p.innerHTML = `<br>`;
  return p;
}

async function insertBlankLine() {
  if (!underEditing()) {
    return message.error('该功能只可在编辑文档时使用');
  }

  const editor = document.querySelector('.lake-content-editor-core')!;

  const wordsCount = (editor.textContent || '').replace(/(?:\r\n|\r|\n|\s)/g, '').length;
  if (!wordsCount) return message.error('文档没有内容，请先写一些文字吧');

  const pElements = document.querySelectorAll('.lake-content-editor-core > p');
  Array.from(pElements).forEach(p => editor.insertBefore(createParagraph(), p.nextSibling));

  void message.success('插入空行成功');
}

export default insertBlankLine;

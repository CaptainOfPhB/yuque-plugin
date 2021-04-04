import store from '@/store';
import { message } from 'antd';
import underEditing from '@/helper/underEditing';
import randomLakeId from '@/helper/randomLakeId';
import isArticlePage from '@/helper/isArticlePage';

function createDivider() {
  const div = document.createElement('div');
  div.setAttribute('data-card-type', 'block');
  div.setAttribute('data-lake-card', 'hr');
  div.innerHTML = `
    <div data-card-element="body">
      <span data-card-element="left">&#8203;</span>
      <div data-card-element="center" contenteditable="false"><hr></div>
      <span data-card-element="right">&#8203;</span>
      <div class="lake-card-dnd" draggable="true" contenteditable="false">
        <div class="lake-card-dnd-trigger" data-aspm-click="dnd" data-aspm-param="hr">
          <span class="lake-icon lake-icon-drag"></span>
        </div>
      </div>
      <div class="lake-embed-toolbar lake-card-toolbar lake-embed-toolbar-block" contenteditable="false" style="left: 0;">
        <div class="lake-embed-toolbar-group" data-aspm="card-toolbar">
          <span class="lake-embed-toolbar-item lake-embed-toolbar-item-copy">
            <a class="lake-embed-toolbar-btn " data-aspm-click="copy" data-aspm-param="hr">
              <span class="lake-icon lake-icon-copy"></span>
            </a>
          </span>
          <span class="lake-embed-toolbar-item-split"></span>
          <span class="lake-embed-toolbar-item lake-embed-toolbar-item-delete">
            <a class="lake-embed-toolbar-btn " data-aspm-click="delete" data-aspm-param="hr">
              <span class="lake-icon lake-icon-delete"></span>
            </a>
          </span>
        </div>
      </div>
    </div>
  `;
  return div;
}

function createParagraph(summary: string) {
  const lakeId = randomLakeId(32);
  const p = document.createElement('p');
  p.setAttribute('data-lake-id', lakeId);
  p.innerHTML = `<span class="lake-fontsize-9" style="color: rgb(140, 140, 140);">${summary}</span>`;
  return p;
}

async function insertSummaryInfo() {
  if (!isArticlePage()) {
    return message.error('该功能只可在文档页面使用');
  }
  if (!underEditing()) {
    return message.error('该功能只可在编辑文档时使用');
  }

  const editor = document.querySelector('.lake-content-editor-core')!;

  const wordsCount = (editor.textContent || '').replace(/(?:\r\n|\r|\n|\s)/g, '').length;
  if (!wordsCount) return message.error('文档没有内容，请先写一些文字吧');

  const config = await store.get<{ readingSpeed: number }>('basicConfig', ['readingSpeed']);
  if (!config) return message.error('请配置阅读速度后再使用');

  const time = Math.round(wordsCount / config.readingSpeed);
  const summary = `本文约 ${wordsCount} 字，阅读预计需要 ${time} 分钟`;

  editor.prepend(createDivider());
  editor.prepend(createParagraph(summary));

  void message.success('文档统计信息插入成功');
}

export default insertSummaryInfo;

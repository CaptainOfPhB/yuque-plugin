import store from '@/store';
import { message } from 'antd';
import TurndownService from 'turndown';
import * as markmap from 'markmap-view';
import { Transformer } from 'markmap-lib';
import { replaceCardElement, replacePElement, normalizeOlElement, insertH1Element } from '@/helper/replaceHtmlElement';

import './mindmap.less';

const transformer = new Transformer();
const { Markmap, loadCSS, loadJS } = markmap;

const turndownService = new TurndownService({ codeBlockStyle: 'fenced' })
  .addRule('pre', {
    filter: 'pre',
    replacement: function (content: string, node: Node) {
      const codeTag = node.firstChild as Element;
      const language = codeTag.getAttribute('data-language');
      return '```' + language + '\n' + content + '\n```';
    }
  })
  .addRule('h1', {
    filter: 'h1',
    replacement: function (content: string, node: Node) {
      const [level] = node.nodeName.split('').reverse();
      const hashKeys = '#'.repeat(Number(level));
      return `${hashKeys} ${content}`;
    }
  });

void (async function init() {
  let html = await store.get<{ content: string; title: string }>('html', ['content', 'title']);
  if (!html) {
    const cachedHtml = window.sessionStorage.getItem('html');
    if (!cachedHtml) return message.error('文档内容不存在');
    html = JSON.parse(cachedHtml) as { content: string; title: string };
  } else {
    window.sessionStorage.setItem('html', JSON.stringify(html));
  }
  const virtualDocument = createDocument(html.title, html.content);
  const markdown = turndownService.turndown(virtualDocument.body);
  createMindMap(markdown);
  await store.remove('html');
})();

function createDocument(title: string, html: string) {
  const document = new DOMParser().parseFromString(html, 'text/html');
  replaceCardElement(document);
  replacePElement(document);
  normalizeOlElement(document);
  insertH1Element(document, title);
  return document;
}

function createMindMap(markdown: string) {
  const { root, features } = transformer.transform(markdown);
  const { styles, scripts } = transformer.getUsedAssets(features);
  if (styles) loadCSS(styles);
  if (scripts) void loadJS(scripts, { getMarkmap: () => markmap });
  const svgElement = document.querySelector<SVGAElement>('#mind-map')!;
  Markmap.create(svgElement, undefined, root);
}

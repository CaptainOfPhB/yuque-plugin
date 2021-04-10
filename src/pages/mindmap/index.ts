import store from '@/store';
import { message } from 'antd';
import TurndownService from 'turndown';
import * as markmap from 'markmap-view';
import { Transformer } from 'markmap-lib';
import { replaceCardElement, replacePElement } from '@/helper/replaceHtmlElement';

import './mindmap.less';

const turndownService = new TurndownService({ codeBlockStyle: 'fenced' });

turndownService.addRule('pre', {
  filter: 'pre',
  replacement: function (content: string, node: Node) {
    const codeTag = node.firstChild as Element;
    const language = codeTag.getAttribute('data-language');
    return '```' + language + '\n' + content + '\n```';
  }
});

const transformer = new Transformer();
const { Markmap, loadCSS, loadJS } = markmap;

void (async function init() {
  const html = await store.get<{ content: string }>('html', ['content']);
  if (!html) return message.error('文档内容不存在');
  const virtualDocument = createDocument(html.content);
  const markdown = turndownService.turndown(virtualDocument.body);
  const { root, features } = transformer.transform(markdown);
  const { styles, scripts } = transformer.getUsedAssets(features);
  if (styles) loadCSS(styles);
  if (scripts) void loadJS(scripts, { getMarkmap: () => markmap });
  const svgElement = document.querySelector<SVGAElement>('#mind-map')!;
  Markmap.create(svgElement, undefined, root);
})();

function createDocument(html: string) {
  const document = new DOMParser().parseFromString(html, 'text/html');
  replaceCardElement(document);
  replacePElement(document);
  return document;
}

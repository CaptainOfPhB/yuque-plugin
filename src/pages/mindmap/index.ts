import store from '@/store';
import { message } from 'antd';
import TurndownService from 'turndown';
import { replaceCardElement, replacePElement } from '@/helper/replaceHtmlElement';

const turndownService = new TurndownService({ codeBlockStyle: 'fenced' });

turndownService.addRule('pre', {
  filter: 'pre',
  replacement: function (content: string, node: Node) {
    const codeTag = node.firstChild as Element;
    const language = codeTag.getAttribute('data-language');
    return '```' + language + '\n' + content + '\n```';
  }
});

void (async function init() {
  const html = await store.get<{ content: string }>('html', ['content']);
  if (!html) return message.error('文档内容不存在');
  const document = createDocument(html.content);
  const markdown = turndownService.turndown(document.body);
  console.log(markdown);
})();

function createDocument(html: string) {
  const document = new DOMParser().parseFromString(html, 'text/html');
  replaceCardElement(document);
  replacePElement(document);
  return document;
}

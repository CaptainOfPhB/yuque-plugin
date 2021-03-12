import { MenuItem, Type } from '@/interface';

const Menu: MenuItem[] = [
  {
    type: Type.Url,
    title: '复制当前页面链接',
    contexts: ['all'],
    runOnAnyPage: true,
    visible: true
  },
  {
    type: Type.Image,
    title: '复制图片链接',
    contexts: ['link', 'image'],
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Link,
    title: '复制链接地址',
    contexts: ['link', 'image'],
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Markdown,
    title: '查看 Markdown 结构',
    runOnAnyPage: false,
    visible: true
  },
  {
    type: Type.Html,
    title: '查看 HTML 结构',
    runOnAnyPage: false,
    visible: true
  },
  {
    type: Type.Insert,
    title: '插入随机图片（Bing）',
    runOnAnyPage: false,
    visible: true
  },
  {
    type: Type.Indent,
    title: '首行缩进',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Format,
    title: '文本格式化',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Directory,
    title: '复制目录列表',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.MindMapping,
    title: '生成思维导图',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.SerialNumber,
    title: '生成编号',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Save,
    title: '网页转存',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Diary,
    title: '日记',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Tooltip,
    title: '插入提示框',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Header,
    title: '插入彩色标题头',
    runOnAnyPage: false,
    visible: false
  },
  {
    type: Type.Emoji,
    title: '插入表情',
    runOnAnyPage: false,
    visible: false
  }
];

export default Menu;

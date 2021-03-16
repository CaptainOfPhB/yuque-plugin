import { MenuItem, Type } from '@/interface';

const Menu: MenuItem[] = [
  {
    type: Type.Url,
    title: '复制页面链接',
    contexts: ['all']
  },
  {
    type: Type.Image,
    title: '复制图片链接',
    contexts: ['image']
  },
  {
    type: Type.Link,
    title: '复制链接地址',
    contexts: ['link']
  },
  {
    type: Type.Separator
  },
  {
    type: Type.Markdown,
    title: '查看 Markdown 结构',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Html,
    title: '查看 HTML 结构',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Separator
  },
  {
    type: Type.Insert,
    title: '插入随机图片（Bing）',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Indent,
    title: '首行缩进',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Format,
    title: '文本格式化',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Directory,
    title: '复制目录列表',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.MindMapping,
    title: '生成思维导图',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.SerialNumber,
    title: '生成编号',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Save,
    title: '网页转存',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Diary,
    title: '日记',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Separator
  },
  {
    type: Type.Tooltip,
    title: '插入提示框',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Header,
    title: '插入彩色标题头',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Emoji,
    title: '插入表情',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  }
];

export default Menu;

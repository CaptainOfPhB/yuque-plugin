import { MenuItem, Type } from '@/interface';

const Menu: MenuItem[] = [
  {
    type: Type.Url,
    title: '复制当前页面链接',
    contexts: ['all']
  },
  {
    type: Type.Image,
    title: '复制图片链接',
    contexts: ['link', 'image']
  },
  {
    type: Type.Link,
    title: '复制链接地址',
    contexts: ['link', 'image']
  },
  {
    type: Type.Markdown,
    title: '查看 Markdown 结构',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Html,
    title: '查看 HTML 结构',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Insert,
    title: '插入随机图片（Bing）',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Indent,
    title: '首行缩进',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Format,
    title: '文本格式化',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Directory,
    title: '复制目录列表',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.MindMapping,
    title: '生成思维导图',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.SerialNumber,
    title: '生成编号',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Save,
    title: '网页转存',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Diary,
    title: '日记',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Tooltip,
    title: '插入提示框',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Header,
    title: '插入彩色标题头',
    onlyRunOnYuquePage: true
  },
  {
    type: Type.Emoji,
    title: '插入表情',
    onlyRunOnYuquePage: true
  }
];

export default Menu;

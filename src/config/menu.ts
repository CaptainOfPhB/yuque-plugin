interface MenuItem {
  type: string;
  title: string;
  visible: boolean;
}

const menu: MenuItem[] = [
  {
    type: 'markdown',
    title: '查看 Markdown 结构',
    visible: true
  },
  {
    type: 'html',
    title: '查看 HTML 结构',
    visible: true
  },
  {
    type: 'url',
    title: '复制当前页面 URL',
    visible: true
  },
  {
    type: 'image',
    title: '插入随机图片（Bing）',
    visible: true
  },
  {
    type: 'markdown',
    title: '首行缩进',
    visible: false
  },
  {
    type: 'markdown',
    title: '文本格式化',
    visible: false
  },
  {
    type: 'markdown',
    title: '复制目录列表',
    visible: false
  },
  {
    type: 'markdown',
    title: '生成思维导图',
    visible: false
  },
  {
    type: 'markdown',
    title: '生成编号',
    visible: false
  },
  {
    type: 'markdown',
    title: '网页转存',
    visible: false
  },
  {
    type: 'markdown',
    title: '日记',
    visible: false
  },
  {
    type: 'markdown',
    title: '配置',
    visible: false
  },
  {
    type: 'markdown',
    title: '帮助&反馈',
    visible: false
  },
  {
    type: 'markdown',
    title: '插入提示框',
    visible: false
  },
  {
    type: 'markdown',
    title: '插入彩色标题头',
    visible: false
  },
  {
    type: 'markdown',
    title: '插入表情',
    visible: false
  }
];

export default menu;

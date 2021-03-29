import { MenuItem, Type } from '@/interface';

const Menu: MenuItem[] = [
  {
    type: Type.CopyUrl,
    title: '复制页面链接',
    contexts: ['all']
  },
  {
    type: Type.CopyImage,
    title: '复制图片链接',
    contexts: ['image']
  },
  {
    type: Type.CopyLink,
    title: '复制链接地址',
    contexts: ['link']
  },
  {
    type: Type.CopyDirectory,
    title: '复制目录列表',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.CopyTOC,
    title: '复制文章大纲',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Separator
  },
  {
    type: Type.ViewMarkdown,
    title: '查看 Markdown 结构',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.ViewHTML,
    title: '查看 HTML 结构',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Separator
  },
  {
    type: Type.InsertRandomImage,
    title: '插入随机图片（Bing）',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.InsertSummaryInfo,
    title: '插入统计信息',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Indent,
    title: '插入缩进',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.InsertBlankLine,
    title: '插入空行',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.InsertTooltip,
    title: '插入提示框',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.InsertEmoji,
    title: '插入 Emoji 表情',
    contexts: ['all']
  },
  {
    type: Type.Separator
  },
  {
    type: Type.CreateMindMapping,
    title: '生成思维导图',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.CreateDiary,
    title: '生成日记',
    onlyRunOnYuquePage: true,
    contexts: ['all']
  },
  {
    type: Type.Separator
  },
  {
    type: Type.PlayAmbienceSound,
    title: '播放环境音（白噪声）',
    contexts: ['all']
  }
];

export default Menu;

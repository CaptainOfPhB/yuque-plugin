import OnClickData = chrome.contextMenus.OnClickData;

export interface MenuItem {
  type: Type;
  title?: string;
  contexts?: ContextType[];
  onlyRunOnYuquePage?: boolean;
}

export type ContextType =
  | 'all'
  | 'page'
  | 'frame'
  | 'selection'
  | 'link'
  | 'editable'
  | 'image'
  | 'video'
  | 'audio'
  | 'launcher'
  | 'browser_action'
  | 'page_action'
  | 'action';

export enum Type {
  Help = 'Help',
  Indent = 'Indent',
  CopyUrl = 'CopyUrl',
  CopyTOC = 'CopyTOC',
  Setting = 'Setting',
  ViewHTML = 'ViewHTML',
  CopyLink = 'CopyLink',
  Separator = 'Separator',
  CopyImage = 'CopyImage',
  CreateDiary = 'CreateDiary',
  InsertEmoji = 'InsertEmoji',
  ViewMarkdown = 'ViewMarkdown',
  InsertTooltip = 'InsertTooltip',
  CopyDirectory = 'CopyDirectory',
  InsertBlankLine = 'InsertBlankLine',
  InsertRandomImage = 'InsertRandomImage',
  CreateMindMapping = 'CreateMindMapping',
  InsertSummaryInfo = 'InsertSummaryInfo',
  PlayAmbienceSound = 'PlayAmbienceSound'
}

export enum TypeDescription {
  Indent = '首行缩进',
  Help = '帮助和反馈',
  Setting = '设置插件',
  CopyLink = '复制链接',
  CopyImage = '复制图片',
  CopyUrl = '复制页面链接',
  CopyTOC = '复制文章大纲',
  Separator = '菜单分割线',
  CreateDiary = '生成日记',
  ViewHTML = '查看 HTML 结构',
  InsertTooltip = '插入提示框',
  InsertBlankLine = '插入空行',
  CopyDirectory = '复制目录列表',
  InsertEmoji = '插入 Emoji 表情',
  InsertRandomImage = '插入随机图片',
  CreateMindMapping = '生成思维导图',
  InsertSummaryInfo = '插入统计信息',
  ViewMarkdown = '查看 Markdown 结构',
  PlayAmbienceSound = '播放环境声（白噪声）'
}

export interface Config {
  menu: MenuConfig;
  yuque: YuqueConfig;
  basic: BasicConfig;
}

export type YuqueConfig = Partial<{
  domain: string;
  repoName: string;
  userName: string;
  accessToken: string;
}>;

export type MenuConfig = Omit<
  Partial<
    {
      [key in Type]: boolean;
    }
  >,
  'separator' | 'setting' | 'help'
>;

export type BasicConfig = Partial<{
  readingSpeed: number;
}>;

export interface RequestCreateContextMenu {
  isYuquePage: boolean;
  action: 'createContextMenu';
}

export interface RequestOpenOptionsPage {
  action: 'openOptionsPage';
}

export interface RequestFromBackgroundScript {
  type: Type;
  info: OnClickData;
}

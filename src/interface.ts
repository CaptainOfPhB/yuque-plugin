import OnClickData = chrome.contextMenus.OnClickData;

export interface MenuItem {
  type: Type;
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
  Setting = 'Setting',
  ViewHTML = 'ViewHTML',
  CopyLink = 'CopyLink',
  Separator = 'Separator',
  CopyImage = 'CopyImage',
  CopyDocToc = 'CopyDocToc',
  CreateDiary = 'CreateDiary',
  InsertEmoji = 'InsertEmoji',
  CopyBookToc = 'CopyBookToc',
  ViewMarkdown = 'ViewMarkdown',
  InsertTooltip = 'InsertTooltip',
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
  Separator = '菜单分割线',
  CreateDiary = '生成日记',
  CopyDocToc = '复制文档大纲',
  ViewHTML = '查看 HTML 结构',
  InsertTooltip = '插入提示框',
  InsertBlankLine = '插入空行',
  CopyBookToc = '复制知识库大纲',
  InsertEmoji = '插入 Emoji 表情',
  InsertRandomImage = '插入随机图片',
  CreateMindMapping = '生成思维导图',
  InsertSummaryInfo = '插入统计信息',
  ViewMarkdown = '查看 Markdown 结构',
  PlayAmbienceSound = '播放环境声（白噪声）'
}

export type YuqueConfig = Partial<{
  repoName: string;
  accessToken: string;
}>;

export type YuqueFormFieldsValue = YuqueConfig & { userName?: string };

export type MenuConfig = Omit<
  Partial<
    {
      [key in Type]: boolean;
    }
  >,
  'separator' | 'setting' | 'help'
>;

export type MenuFormFieldsValue = MenuConfig;

export type BasicConfig = Partial<{
  fontFamily: string;
  readingSpeed: number;
}>;

export type BasicFormFieldsValue = BasicConfig;

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

/**
 * Yuque user model
 */
export interface UserSerializer {
  id: number;
  type: string;
  space_id: number;
  account_id: number;
  login: string;
  name: string;
  avatar_url: string;
  books_count: number;
  public_books_count: number;
  followers_count: number;
  following_count: number;
  public: number;
  description: string;
  created_at: string;
  updated_at: string;
  _serializer: string;
}

/**
 * Yuque repo model
 */
export interface BookSerializer {
  content_updated_at: string;
  created_at: string;
  creator_id: number;
  description: string;
  id: number;
  items_count: number;
  likes_count: number;
  name: string;
  namespace: string;
  public: PublicEnumeration;
  slug: string;
  type: BookType;
  updated_at: string;
  user: UserSerializer;
  user_id: number;
  watches_count: number;
  _serializer: string;
}

export enum PublicEnumeration {
  Public = 1,
  Private = 0
}

export enum BookType {
  Book = 'Book',
  Sheet = 'Sheet',
  Column = 'Column'
}

/**
 * Yuque TOC model
 */
export interface TocSerializer {
  url: string;
  title: string;
}

export interface DocSerializer {
  slug: string;
  body: string;
  title: string;
  body_lake: string;
  description: string;
  public: PublicEnumeration;
}

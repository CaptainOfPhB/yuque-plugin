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
  Url = 'url', // 复制页面链接
  HTML = 'html', // 查看 HTML 结构
  Save = 'save', //网页转存
  Link = 'link', //复制链接
  Diary = 'diary', //日记
  Emoji = 'emoji', //插入表情
  Image = 'image', // 复制图片
  Insert = 'insert', // 插入随机图片
  Header = 'header', // 插入彩色标题头
  Indent = 'indent', //首行缩进
  Format = 'format', //文本格式化
  Setting = 'setting', //设置
  Tooltip = 'tooltip', // 插入提示框
  Feedback = 'feedback', //帮助和反馈
  Markdown = 'markdown', //查看 Markdown 结构
  Separator = 'separator',
  Directory = 'directory', // 查看目录列表
  MindMapping = 'mind-mapping', // 生成思维导图
  SerialNumber = 'serial-number' // 生成序列号
}

export interface RequestFromContentScript {
  isYuquePage: boolean;
  action: 'createContextMenu';
}

export interface RequestFromBackgroundScript {
  type: Type;
  info: OnClickData;
}

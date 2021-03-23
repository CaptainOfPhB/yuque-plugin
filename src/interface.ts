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
  /**
   * 菜单分割线
   * @type {Type.Separator}
   */
  Separator = 'separator',
  /**
   * 复制页面链接
   * @type {Type.CopyUrl}
   */
  CopyUrl = 'copy url',
  /**
   * 查看 HTML 结构
   * @type {Type.ViewHTML}
   */
  ViewHTML = 'view HTML',
  /**
   * 复制链接
   * @type {Type.CopyLink}
   */
  CopyLink = 'copy link',
  /**
   * 生成日记
   * @type {Type.CreateDiary}
   */
  CreateDiary = 'create diary',
  /**
   * 插入 Emoji 表情
   * @type {Type.InsertEmoji}
   */
  InsertEmoji = 'insert emoji',
  /**
   * 复制图片
   * @type {Type.CopyImage}
   */
  CopyImage = 'copy image',
  /**
   * 插入随机图片
   * @type {Type.InsertRandomImage}
   */
  InsertRandomImage = 'insert random image',
  /**
   * 插入空行
   * @type {Type.InsertBlankLine}
   */
  InsertBlankLine = 'insert blank line',
  /**
   * 查看 Markdown 结构
   * @type {Type.ViewMarkdown}
   */
  ViewMarkdown = 'view markdown',
  /**
   * 复制文章大纲
   * @type {Type.CopyTOC}
   */
  CopyTOC = 'copy TOC',
  /**
   * 复制目录列表
   * @type {Type.CopyDirectory}
   */
  CopyDirectory = 'copy directory',
  /**
   * 生成思维导图
   * @type {Type.CreateMindMapping}
   */
  CreateMindMapping = 'create mind mapping',
  /**
   * 插入统计信息
   * @type {Type.InsertSummaryInfo}
   */
  InsertSummaryInfo = 'insert summary info',
  /**
   * 播放环境声（白噪声）
   * @type {Type.PlayAmbienceSound}
   */
  PlayAmbienceSound = 'play ambience sound',
  /**
   * 插入提示框
   * @type {Type.InsertTooltip}
   */
  InsertTooltip = 'insert tooltip',
  /**
   * 设置
   * @type {Type.Setting}
   */
  Setting = 'setting',
  /**
   * 帮助和反馈
   * @type {Type.Help}
   */
  Help = 'help'
}

export interface RequestFromContentScript {
  isYuquePage: boolean;
  action: 'createContextMenu';
}

export interface RequestFromBackgroundScript {
  type: Type;
  info: OnClickData;
}

export interface MenuItem {
  type: Type;
  title: string;
  visible: boolean;
  runOnAnyPage: boolean;
  contexts?: ContextType[];
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
  Url = 'url',
  Html = 'html',
  Save = 'save',
  Link = 'link',
  Diary = 'diary',
  Emoji = 'emoji',
  Image = 'image',
  Insert = 'insert',
  Header = 'header',
  Indent = 'indent',
  Format = 'format',
  Setting = 'setting',
  Tooltip = 'tooltip',
  Feedback = 'feedback',
  Markdown = 'markdown',
  Directory = 'directory',
  MindMapping = 'mind-mapping',
  SerialNumber = 'serial-number'
}

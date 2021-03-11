export interface MenuItem {
  type: Type;
  title: string;
  visible: boolean;
  runOnAnyPage: boolean;
}

export enum Type {
  Url = 'url',
  Html = 'html',
  Save = 'save',
  Diary = 'diary',
  Emoji = 'emoji',
  Image = 'image',
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

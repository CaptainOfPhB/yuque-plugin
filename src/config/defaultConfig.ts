import { Config } from '@/interface';

const defaultConfig: Config = {
  yuque: {
    domain: 'www',
    userName: undefined,
    repoName: undefined,
    accessToken: undefined
  },
  basic: {
    readingSpeed: 300
  },
  menu: {
    CopyUrl: true,
    CopyImage: true,
    Indent: true,
    CopyTOC: true,
    Setting: true,
    ViewHTML: true,
    CopyLink: true,
    CreateDiary: true,
    InsertEmoji: true,
    ViewMarkdown: true,
    InsertTooltip: true,
    CopyDirectory: true,
    InsertBlankLine: true,
    InsertRandomImage: true,
    CreateMindMapping: true,
    InsertSummaryInfo: true,
    PlayAmbienceSound: true
  }
};

export default defaultConfig;

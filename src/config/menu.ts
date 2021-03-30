import { MenuItem, Type } from '@/interface';

const Menu: MenuItem[] = [
  { type: Type.CopyUrl, contexts: ['all'] },
  { type: Type.CopyImage, contexts: ['image'] },
  { type: Type.CopyLink, contexts: ['link'] },
  { type: Type.CopyDirectory, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.CopyTOC, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.ViewMarkdown, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.ViewHTML, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.InsertRandomImage, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.InsertSummaryInfo, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Indent, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.InsertBlankLine, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.InsertTooltip, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.InsertEmoji, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.CreateMindMapping, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.CreateDiary, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.PlayAmbienceSound, contexts: ['all'] }
];

export default Menu;

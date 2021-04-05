import { MenuItem, Type } from '@/interface';

const ContextMenu: MenuItem[] = [
  { type: Type.CopyUrl, contexts: ['all'] },
  { type: Type.CopyImage, contexts: ['image'] },
  { type: Type.CopyLink, contexts: ['link'] },
  { type: Type.CopyDocToc, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.CopyBookToc, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.ViewHTML, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.ViewMarkdown, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.InsertEmoji, contexts: ['all'] },
  { type: Type.InsertBlankLine, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.InsertRandomImage, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.InsertSummaryInfo, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.InsertTooltip, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.CreateShorthand, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.CreateMindMapping, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.PlayAmbienceSound, contexts: ['all'] }
];

export default ContextMenu;

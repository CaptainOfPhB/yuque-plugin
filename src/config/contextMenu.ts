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
  { type: Type.InsertRandomImage, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.InsertSummaryInfo, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.CreateShorthand, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.CreateMindMap, onlyRunOnYuquePage: true, contexts: ['all'] },
  { type: Type.Separator },
  { type: Type.PlayAmbienceSound, onlyRunOnYuquePage: true, contexts: ['all'] }
];

export default ContextMenu;

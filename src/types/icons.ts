import { type LucideIcon } from 'lucide-react';

export type BoardIconName =
  | 'rocket'
  | 'folder-kanban'
  | 'clipboard-list'
  | 'bug'
  | 'code'
  | 'palette'
  | 'megaphone'
  | 'briefcase'
  | 'target'
  | 'chart-column'
  | 'calendar'
  | 'check-square'
  | 'users'
  | 'user-round'
  | 'book-open'
  | 'lightbulb'
  | 'flag'
  | 'package'
  | 'settings'
  | 'globe'
  | 'dollar-sign'
  | 'messages-square'
  | 'graduation-cap'
  | 'star';

export type BoardIconAccent =
  | 'purple'
  | 'blue'
  | 'green'
  | 'amber'
  | 'red'
  | 'teal'
  | 'pink'
  | 'slate';

export type BoardIconOption = {
  id: BoardIconName;
  label: string;
  Icon: LucideIcon;
  accent: BoardIconAccent;
};

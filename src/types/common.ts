import type { LucideIcon } from 'lucide-react';

export type OptionTone = 'success' | 'warning' | 'danger' | 'light-primary ';

export type SelectOption<T> = {
  key: T;
  name: string;
  icon?: LucideIcon;
  tone?: OptionTone;
};

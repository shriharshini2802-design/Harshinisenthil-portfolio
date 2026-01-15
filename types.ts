
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export enum ThemeColor {
  PURPLE = 'purple',
  INDIGO = 'indigo',
  VIOLET = 'violet'
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string | null;
  name?: string;
}

export interface Chat {
  id: number;
  title: string;
}
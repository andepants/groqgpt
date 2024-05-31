export interface Message {
  role?: 'user' | 'assistant' | 'system' | string | any;
  content?: string | null;
  imageUrl?: string | null;
  prompt?: string;
  loading?: boolean;
}

export enum Role {
  User = 0,
  Bot = 1,
}

export interface Chat {
  id: number;
  title: string;
}
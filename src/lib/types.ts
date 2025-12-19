export interface User {
  id: string;
  name: string;
  email: string;
  isOnline: boolean;
}

export interface ChatMessage {
  _id?: string;
  sender?: string;
  receiver?: string;
  content: string;
  createdAt?: string;
  self?: boolean;
}

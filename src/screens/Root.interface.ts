export interface Chatroom {
  begun: string | number | Date;
  client: string;
  created: string | number | Date;
  messages: Message;
  operatorId: string;
  operator: string;
  saved: string;
  score: string | number | null;
  status: string;
  theme: string;
  subtheme: string;
  complited: string | number | Date;
}

export interface Client {
  theme: string[];
  subthemes: string[];
}

export interface Message {
  content: string;
  timestamp: string | number | Date;
  writtenBy: string;
  images: string[];
  solution?: boolean;
}

export interface User {
  name: string;
  email?: string;
  photo?: string;
  status?: string | boolean;
}

export interface UserDatabase {
  
}
export interface ChatUser {
  _id: string;
  nickname: string;
  avatar_url: string;
  onlineStatus: boolean;
  lastOnlineDate: string;
}
export interface Chat {
  _id: string;
  users: string[];
  user: ChatUser;
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  text: string;
  files: string[];
  audio: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

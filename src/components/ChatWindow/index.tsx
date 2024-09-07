import ChatArea from "@/features/ChatArea";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import styles from "./index.module.css";
import ChatInput from "@/features/ChatInput";
import noAvatar from "/public/noAvatar.png";
import { useEffect, useState } from "react";
import { Message } from "@/models/Message.model";
import { Chat } from "@/models/Chat.model";
import getMessages from "@/api/chats/getMessages";
import { Socket } from "socket.io-client";
import formatDate from "@/lib/formatDate";

interface ChatWindowProps {
  chat: Chat | undefined;
  currentChatMessages: Message[];
  socket: Socket;
  userId: string;
}
const ChatWindow = ({
  chat,
  currentChatMessages,
  socket,
  userId,
}: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setMessages((prevState: Message[]) => [
      ...prevState,
      ...currentChatMessages,
    ]);
  }, [currentChatMessages]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!chat?._id) return;
      setMessages(await getMessages(chat._id));
      setIsLoading(false);
    })();
  }, [chat]);

  useEffect(() => {
    if (!socket || !chat || !userId) return;

    socket.emit("read", {
      chatId: chat?._id,
      userId,
    });
  }, [chat]);

  if (!chat) return null;

  return (
    <div className={styles.container}>
      {chat && (
        <>
          <div className={styles.header}>
            <a href={`/profile/${chat.user._id}`}>
              <ImageNotDraggable
                src={chat.user.avatar_url || noAvatar}
                width={54}
                height={54}
                alt="avatar"
                className={styles.avatar}
              />
            </a>
            <div className={styles.column}>
              <a href={`/profile/${chat.user._id}`} className={styles.nickname}>
                {chat.user.nickname}
              </a>
              <span className={styles.time}>
                {chat.user.onlineStatus
                  ? "В сети"
                  : "Был(а) в сети " + formatDate(chat.user.lastOnlineDate)}
              </span>
            </div>
          </div>
          <ChatArea
            recipient={chat.user}
            messages={messages}
            isLoading={isLoading}
          />
          <ChatInput socket={socket} recipientId={chat.user._id} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;

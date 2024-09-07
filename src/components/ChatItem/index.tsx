import { Chat, ChatUser } from "@/models/Chat.model";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import styles from "./index.module.css";
import noAvatar from "/public/noAvatar.png";
import { useEffect, useState } from "react";

interface ChatItemProps {
  chat: Chat;
  onSelectChat: (chatId: string) => void;
}
const ChatItem = ({ chat, onSelectChat }: ChatItemProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [chatsCount, setChatsCount] = useState<number | undefined>(undefined);
  const user: ChatUser = chat.user;

  useEffect(() => {
    if (!chat.lastMessage) setMessage(null);
    else {
      chat.lastMessage.length > 38
        ? setMessage(`${chat.lastMessage.slice(0, 38)}...`)
        : setMessage(chat.lastMessage);
    }
  }, [chat]);

  useEffect(() => {
    const containers: NodeListOf<HTMLDivElement> | null =
      document.querySelectorAll(".ChatItem_container__C2hs7");

    setChatsCount(containers.length);
  }, []);

  return (
    <div
      className={`${styles.container} ${
        chatsCount === 1 && styles.oneContainer
      }`}
      onClick={() => onSelectChat(chat._id)}
    >
      <div className={styles.avatarContainer}>
        <ImageNotDraggable
          src={user?.avatar_url || noAvatar}
          alt="avatar"
          width={54}
          height={54}
          className={`${styles.avatar} ${
            chat.user.onlineStatus && styles.online
          }`}
        />
        {chat.unreadMessagesCount ? (
          <div className={styles.count}>{chat.unreadMessagesCount}</div>
        ) : null}
      </div>
      <div className={styles.content}>
        <span className={styles.time}>21:00</span>
        <span className={styles.nickname}>
          {user.nickname.length > 23
            ? `${user.nickname.slice(0, 23)}...`
            : user.nickname}
        </span>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  );
};

export default ChatItem;

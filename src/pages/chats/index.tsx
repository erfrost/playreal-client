import BreadcrumbNav from "@/components/BreadcrumbNav";
import styles from "@/styles/chats.module.css";
import ChatItem from "@/components/ChatItem";
import { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import { Chat, ChatUser } from "@/models/Chat.model";
import getChats from "@/api/chats/getChats";
import getUserId from "@/api/users/getUserId";
import { toastError } from "@/lib/toastifyActions";
import { Message } from "@/models/Message.model";
import { Socket, io } from "socket.io-client";
import { NextRouter, useRouter } from "next/router";
import { Files } from "lucide-react";

interface OnlineStatusPayload {
  userId: string;
  onlineStatus: boolean;
  lastOnlineDate: string;
}

const Chats = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined);
  const [currentChatMessages, setCurrentChatMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router: NextRouter = useRouter();
  const chatId: any = router.query.chatId;

  useEffect(() => {
    (async () => {
      const userId: string = await getUserId();

      if (!userId) {
        return toastError("При загрузке чатов произошла ошибка");
      }
      setSocket(io(`${process.env.BASE_SOCKET_URL}?userId=${userId}`));

      const chats: Chat[] = await getChats();
      if (!chats) return;
      //
      setChats(chats);

      if (chatId) {
        const chatById: Chat | undefined = chats.find(
          (chat: Chat) => chat._id === chatId
        );
        if (!chatById) return setCurrentChat(chats[0]);
        else setCurrentChat(chatById);
      } else setCurrentChat(chats[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setUserId(await getUserId());
    })();
  }, []);

  const handleConnect = () => {
    console.log("connect");
  };
  const handleDisconnect = () => {
    console.log("disconnect");
  };
  const handleError = (error: string) => {
    toastError(error);
  };
  const handleMessage = (message: Message) => {
    if (
      currentChat &&
      message.chatId === currentChat._id &&
      (message.text || message.files.length)
    ) {
      console.log("yjdjt сообщения: ", message.text, message.files);
      setCurrentChatMessages((prevState: Message[]) => [...prevState, message]);
    }
    setChats((prevState: Chat[]) => {
      const arr: Chat[] = [...prevState];
      const currentChatIndex: number = arr.findIndex(
        (chat: Chat) => chat._id === message.chatId
      );

      if (currentChatIndex === -1 || !arr[currentChatIndex]) return prevState;

      const updatedChat: Chat = {
        ...arr[currentChatIndex],
        lastMessage: message.text
          ? message.text
          : message.files.length
          ? `Файлы: ${message.files.length} шт.`
          : "Ничего",
        unreadMessagesCount:
          currentChat?._id === arr[currentChatIndex]._id
            ? arr[currentChatIndex].unreadMessagesCount
            : (arr[currentChatIndex].unreadMessagesCount ?? 0) + 1,
      };

      arr[currentChatIndex] = updatedChat;

      return arr;
    });
  };
  const handleOnlineStatus = (payload: OnlineStatusPayload) => {
    setChats((prevState: Chat[]) => {
      const arr: Chat[] = [...prevState];
      const currentChatIndex: number = arr.findIndex((chat: Chat) =>
        chat.users.includes(payload.userId)
      );

      if (currentChatIndex === -1) return prevState;

      const updatedChat: Chat = {
        ...arr[currentChatIndex],
        user: {
          ...arr[currentChatIndex].user,
          onlineStatus: payload.onlineStatus,
          lastOnlineDate: payload.lastOnlineDate,
        },
      };

      arr[currentChatIndex] = updatedChat;

      return arr;
    });

    if (currentChat && currentChat.users.includes(payload.userId)) {
      setCurrentChat((prevState: Chat | undefined) => {
        if (!prevState) return;

        const newUser: ChatUser = {
          ...prevState.user,
          onlineStatus: payload.onlineStatus,
          lastOnlineDate: payload.lastOnlineDate,
        };

        return {
          ...prevState,
          user: newUser,
        };
      });
    }
  };

  const onSelectChat = (chatId: string) => {
    if (!chatId || (currentChat && chatId === currentChat._id)) return;

    setCurrentChatMessages([]);
    setCurrentChat(chats.find((chat: Chat) => chat._id === chatId));
    setChats((prevState: Chat[]) => {
      const arr: Chat[] = [...prevState];
      const currentChatIndex: number = arr.findIndex(
        (chat: Chat) => chat._id === chatId
      );

      if (currentChatIndex === -1) return prevState;

      const updatedChat: Chat = {
        ...arr[currentChatIndex],
        unreadMessagesCount: 0,
      };

      arr[currentChatIndex] = updatedChat;

      return arr;
    });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("error", handleError);
    socket.on("message", handleMessage);
    socket.on("onlineStatus", handleOnlineStatus);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("error", handleError);
      socket.off("message", handleMessage);
      socket.on("onlineStatus", handleOnlineStatus);
    };
  }, [socket, chats, currentChat]);

  if (!userId || !socket) return null;

  return (
    <div className={styles.container}>
      <BreadcrumbNav
        theme="dark"
        routes={[
          {
            title: "Главная",
            path: "/",
          },
          {
            title: "Мои заказы",
            path: "/profile",
          },
          {
            title: "Чаты",
            path: "/chats",
          },
        ]}
      />
      <div className={styles.content}>
        <div className={styles.navbar}>
          {chats?.map((chat: Chat) => (
            <ChatItem key={chat._id} chat={chat} onSelectChat={onSelectChat} />
          ))}
        </div>
        <ChatWindow
          chat={currentChat}
          currentChatMessages={currentChatMessages}
          socket={socket}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default Chats;

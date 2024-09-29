import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import supportIcon from "/public/icons/support.svg";
import logo from "/public/playreal-logo.svg";
import sendIcon from "/public/icons/sendMessage.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { supportIsOpenState } from "@/storage/atoms";
import PrimaryBtn from "@/components/PrimaryBtn";
import { Socket, io } from "socket.io-client";
import getUserId from "@/api/users/getUserId";
import { toastError } from "@/lib/toastifyActions";
import { SupportMessage } from "@/models/SupportMessage.model";
import getSupportMessages from "@/api/supportChat/getSupportMessages";

const Support = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useRecoilState<boolean>(supportIsOpenState);
  const [screenWidth, setScreenWidth] = useState<number>(1920);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || screenWidth < 1000) return;

    const input: HTMLInputElement | null = document.getElementById(
      "support-input"
    ) as HTMLInputElement;
    if (!input) return;

    input.focus();
  }, [isOpen]);

  useEffect(() => {
    (async () => {
      setMessages(await getSupportMessages());
    })();
  }, []);

  useEffect(() => {
    const messagesContainer: HTMLDivElement | null = document.querySelector(
      ".Support_list__8zfKD"
    );
    if (!messagesContainer) return;

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

  useEffect(() => {
    (async () => {
      const userId: string = await getUserId();
      setUserId(userId);

      setSocket(io(`${process.env.BASE_SOCKET_URL}/support?userId=${userId}`));
    })();
  }, []);

  const onAddMessage = (message: SupportMessage) => {
    setMessages((prevState: SupportMessage[]) => [...prevState, message]);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => console.log("connect"));
    socket.on("disconnect", () => console.log("disconnect"));
    socket.on("error", (error: string) => toastError(error));
    socket.on("message", (message: SupportMessage) => onAddMessage(message));

    return () => {
      socket.off("connect", () => console.log("connect"));
      socket.off("disconnect", () => console.log("disconnect"));
      socket.off("error", (error: string) => toastError(error));
      socket.off("message", (message: SupportMessage) => onAddMessage(message));
    };
  }, [socket]);

  const onEnterDown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", onEnterDown);

    return () => document.removeEventListener("keydown", onEnterDown);
  }, [text, socket, isOpen]);

  const sendMessage = () => {
    if (!socket || !isOpen || !text) return;

    socket.emit("message", text);

    setText("");
  };

  return (
    <div className={styles.container}>
      <PrimaryBtn
        className={styles.btn}
        onClick={() => setIsOpen((prevState: boolean) => !prevState)}
      >
        <ImageNotDraggable
          src={supportIcon}
          alt="support"
          className={styles.supportIcon}
        />
        <span className={styles.btnText}>Отправьте нам сообщение!</span>
      </PrimaryBtn>
      <div className={`${styles.content} ${isOpen && styles.open}`}>
        <div className={styles.header}>
          <ImageNotDraggable src={logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.chatArea}>
          {messages.length ? (
            <div className={styles.list}>
              {messages.map((message: SupportMessage) => (
                <div
                  className={`${styles.message} ${
                    message.senderId === userId ? styles.right : styles.left
                  }`}
                  key={message._id}
                >
                  <span className={styles.messageText}>{message.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.greeting}>
              <span className={styles.greetingBold}>HI!</span>
              <span className={styles.greetingSmall}>
                Напишите нам Ваш вопрос
              </span>
              <span className={styles.greetingSmall}>
                Мы постараемся ответить как можно скорее
              </span>
            </div>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            id="support-input"
            placeholder="Сообщение..."
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />
          <button className={styles.sendBtn} onClick={sendMessage}>
            <ImageNotDraggable
              src={sendIcon}
              alt="sendIcon"
              className={styles.sendIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;

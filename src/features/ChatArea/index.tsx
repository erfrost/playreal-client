import { Message } from "@/models/Message.model";
import styles from "./index.module.css";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import { ChatUser } from "@/models/Chat.model";
import noAvatar from "/public/noAvatar.png";
import { useEffect, useState } from "react";
import MessageContent from "./ui/MessageContent";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ChatAreaProps {
  recipient: ChatUser;
  messages: Message[];
  isLoading: boolean;
}
const ChatArea = ({ recipient, messages, isLoading }: ChatAreaProps) => {
  const [modalFile, setModalFile] = useState<string | null>(null);

  useEffect(() => {
    if (modalFile) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
  }, [modalFile]);

  useEffect(() => {
    const modal: HTMLDivElement | null = document.querySelector(
      ".ChatArea_modal__jFrmz"
    );
    if (!modal) return;

    modal.addEventListener("click", () => setModalFile(null));
  }, [modalFile]);

  // что бы скроллилось и не ломалось
  useEffect(() => {
    const chatWindow: HTMLDivElement | null = document.querySelector(
      ".ChatWindow_container__cgPH7"
    );
    const chatHeader: HTMLDivElement | null = document.querySelector(
      ".ChatWindow_header__BP5LY"
    );
    const chatArea: HTMLDivElement | null = document.querySelector(
      ".ChatArea_container__Eg0_Y"
    );
    const chatInputs: HTMLDivElement | null = document.querySelector(
      ".ChatInput_container__yb2JR"
    );
    const messagesContainer: HTMLDivElement | null = document.querySelector(
      ".ChatArea_content__nL6XR"
    );
    if (
      !chatWindow ||
      !chatArea ||
      !chatHeader ||
      !chatInputs ||
      !messagesContainer
    )
      return;

    chatArea.style.maxHeight =
      chatWindow.clientHeight -
      chatHeader.clientHeight -
      chatInputs.clientHeight +
      "px";

    const areaHeight: number = chatArea.clientHeight;

    messagesContainer.style.maxHeight = areaHeight + "px";
  }, [isLoading]);

  // для перемещения чата в самый низ
  useEffect(() => {
    setTimeout(() => {
      const messagesContainer: HTMLDivElement | null = document.querySelector(
        ".ChatArea_content__nL6XR"
      );
      if (!messagesContainer) return;

      const height: number = messagesContainer.scrollHeight;

      messagesContainer.scrollTo({ top: height });
    }, 0);
  }, [messages]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loadingSpinner}>
          <LoadingSpinner size="100px" />
        </div>
      ) : (
        <div className={styles.content}>
          {messages.map((message: Message) => (
            <div
              className={`${styles.message} ${
                message.senderId === recipient._id && styles.recipientMessage
              }`}
              key={message._id}
            >
              {message.senderId === recipient._id && (
                <a
                  href={`/profile/${message.senderId}`}
                  className={styles.avatarLink}
                >
                  <ImageNotDraggable
                    src={recipient.avatar_url || noAvatar}
                    alt="avatar"
                    className={styles.avatar}
                  />
                </a>
              )}
              <MessageContent message={message} setModalFile={setModalFile} />
            </div>
          ))}
        </div>
      )}
      {modalFile && (
        <div className={styles.modal}>
          <Image
            src={modalFile}
            width={500}
            height={600}
            alt="file"
            className={styles.modalFile}
          />
        </div>
      )}
    </div>
  );
};

export default ChatArea;

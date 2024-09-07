import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import icon from "/public/icons/send.svg";
import { Socket } from "socket.io-client";
import { Dispatch, SetStateAction, useEffect } from "react";

interface SendBtnProps {
  socket: Socket | null;
  recipientId: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}
const SendBtn = ({ socket, recipientId, text, setText }: SendBtnProps) => {
  useEffect(() => {
    document.addEventListener("keydown", onEnterClick);

    return () => document.removeEventListener("keydown", onEnterClick);
  }, [text, recipientId]);

  const onEnterClick = (e: KeyboardEvent) => {
    if (e.key == "Enter" && text) {
      onSendMessage();
      setText("");
    }
  };

  const onSendMessage = () => {
    if (!socket || !text) return;

    socket.emit("message", {
      recipient_id: recipientId,
      text,
      files: [],
      audio: null,
    });

    setText("");
  };

  return (
    <div className={styles.container} onClick={onSendMessage}>
      <ImageNotDraggable src={icon} alt="sendIcon" className={styles.icon} />
    </div>
  );
};

export default SendBtn;

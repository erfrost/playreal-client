import { Message } from "@/models/Message.model";
import styles from "./index.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";

type MessageType = "text" | "files" | "combined" | "audio" | undefined;

interface MessageContentProps {
  message: Message;
  setModalFile: Dispatch<SetStateAction<string | null>>;
}
const MessageContent = ({ message, setModalFile }: MessageContentProps) => {
  const [messageType, setMessageType] = useState<MessageType>(undefined);

  useEffect(() => {
    if (message.text && !message.files.length) setMessageType("text");
    else if (message.files.length && !message.text) setMessageType("files");
    else if (message.files.length && message.text) setMessageType("combined");
    else if (message.audio) setMessageType("audio");
  }, []);

  if (!messageType) return null;
  else if (messageType === "text") {
    return (
      <div className={styles.container}>
        <span className={styles.text}>{message.text}</span>
      </div>
    );
  } else if (messageType === "files") {
    return (
      <div className={`${styles.container} ${styles.filesContainer}`}>
        <div className={styles.files}>
          {message.files.map((file: string, index: number) => (
            <ImageNotDraggable
              src={file}
              alt="file"
              width={100}
              height={200}
              key={index}
              className={styles.file}
              onClick={() => setModalFile(file)}
            />
          ))}
        </div>
      </div>
    );
  } else if (messageType === "combined") {
    return (
      <div
        className={`${styles.container} ${styles.filesContainer} ${styles.combinedFilesContainer}`}
      >
        <div className={styles.files}>
          {message.files.map((file: string, index: number) => (
            <ImageNotDraggable
              src={file}
              alt="file"
              width={100}
              height={200}
              key={index}
              className={styles.file}
              onClick={() => setModalFile(file)}
            />
          ))}
        </div>
        <span className={`${styles.text} ${styles.combinedText}`}>
          {message.text}
        </span>
      </div>
    );
  } else if (messageType === "audio") {
    return null;
  }
};

export default MessageContent;

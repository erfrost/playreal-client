import { useState } from "react";
import FilesUpload from "./FilesUpload";
import styles from "./index.module.css";
import TextInput from "./TextInput";
import VoiceInput from "./VoiceInput";
import SendBtn from "./SendBtn";
import { Socket } from "socket.io-client";

interface ChatInputProps {
  socket: Socket | null;
  recipientId: string;
}
const ChatInput = ({ socket, recipientId }: ChatInputProps) => {
  const [text, setText] = useState<string>("");

  return (
    <div className={styles.container}>
      <FilesUpload socket={socket} recipientId={recipientId} />
      <TextInput value={text} setValue={setText} />
      {/* <VoiceInput /> */}
      <SendBtn
        socket={socket}
        recipientId={recipientId}
        text={text}
        setText={setText}
      />
    </div>
  );
};

export default ChatInput;

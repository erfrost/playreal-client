import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import icon from "/public/icons/clip.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import uploadImage from "@/api/files/uploadImage";
import deleteIcon from "/public/icons/delete.svg";
import PrimaryBtn from "@/components/PrimaryBtn";
import { Socket } from "socket.io-client";
import { toastWarning } from "@/lib/toastifyActions";

interface FilesUploadProps {
  socket: Socket | null;
  recipientId: string;
}
const FilesUpload = ({ socket, recipientId }: FilesUploadProps) => {
  const [files, setFiles] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onEnterDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    document.addEventListener("keydown", onEnterDown);

    return () => document.removeEventListener("keydown", onEnterDown);
  }, [isOpenModal, text, files]);

  useEffect(() => {
    if (files.length) setIsOpenModal(true);
  }, [files]);

  const onOpenInput = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const onAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (files.length === 3) {
      return toastWarning("Можно прикрепить максимум 3 файла за раз");
    }

    const file: File = e.target.files[0];

    const newImage: string = await uploadImage(file);

    setFiles((prevState: string[]) => [...prevState, newImage]);
  };

  const onDeleteFile = (fileIndex: number) => {
    setFiles((prevState: string[]) =>
      [...prevState].filter((_, index: number) => index !== fileIndex)
    );
  };

  const onClose = () => {
    setFiles([]);
    setText("");
    setIsOpenModal(false);
  };

  const sendMessage = () => {
    if (!socket) return;

    socket.emit("message", {
      recipient_id: recipientId,
      text,
      files,
      audio: null,
    });

    onClose();
  };

  return (
    <>
      <div className={styles.container} onClick={onOpenInput}>
        <input
          ref={inputRef}
          type="file"
          onChange={onAddFile}
          className={styles.input}
        />
        <ImageNotDraggable src={icon} alt="clipIcon" className={styles.icon} />
      </div>
      {isOpenModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.modalTitle}>Прикрепление файлов</span>
            <div className={styles.modalFiles}>
              {files.map((file: string, index: number) => (
                <div
                  className={styles.fileContainer}
                  key={index}
                  onClick={() => onDeleteFile(index)}
                >
                  <ImageNotDraggable
                    src={file}
                    alt="file"
                    width={100}
                    height={150}
                    className={styles.file}
                    key={index}
                  />
                  <ImageNotDraggable
                    src={deleteIcon}
                    alt="delete"
                    className={styles.deleteIcon}
                  />
                </div>
              ))}
            </div>
            <input
              className={styles.textInput}
              placeholder="Подпись"
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
            <div className={styles.between}>
              <PrimaryBtn className={styles.btn} onClick={onOpenInput}>
                Добавить
              </PrimaryBtn>
              <div className={styles.buttonsGroup}>
                <PrimaryBtn className={styles.btn} onClick={onClose}>
                  Отмена
                </PrimaryBtn>
                <PrimaryBtn className={styles.btn} onClick={sendMessage}>
                  Отправить
                </PrimaryBtn>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilesUpload;

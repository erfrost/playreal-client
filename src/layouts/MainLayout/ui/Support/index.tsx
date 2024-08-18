import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import supportIcon from "/public/icons/support.svg";
import logo from "/public/playreal-logo.svg";
import sendIcon from "/public/icons/sendMessage.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { supportIsOpenState } from "@/storage/atoms";
import PrimaryBtn from "@/components/PrimaryBtn";

const Support = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useRecoilState<boolean>(supportIsOpenState);
  const [screenWidth, setScreenWidth] = useState<number>(1920);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!isOpen || screenWidth < 1000) return;

    const input: HTMLInputElement | null = document.getElementById(
      "support-input"
    ) as HTMLInputElement;
    if (!input) return;

    input.focus();
  }, [isOpen]);

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
      </PrimaryBtn>
      <div className={`${styles.content} ${isOpen && styles.open}`}>
        <div className={styles.header}>
          <ImageNotDraggable src={logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.chatArea}>
          {!messages.length && (
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
          <div className={styles.sendBtn} onClick={() => setText("")}>
            <ImageNotDraggable
              src={sendIcon}
              alt="sendIcon"
              className={styles.sendIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;

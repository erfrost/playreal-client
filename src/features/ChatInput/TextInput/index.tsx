import { ChangeEvent } from "react";
import styles from "./index.module.css";

// const delay: number = 75;

// const toggleButtonsVisibility = (
//   hideBtn: HTMLDivElement | null,
//   showBtn: HTMLDivElement | null
// ) => {
//   if (!hideBtn || !showBtn) return;

//   hideBtn.style.opacity = "0";

//   setTimeout(() => {
//     hideBtn.style.display = "none";
//     showBtn.style.display = "flex";

//     setTimeout(() => (showBtn.style.opacity = "1"), delay);
//   }, delay);
// };

interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
}
const TextInput = ({ value, setValue }: TextInputProps) => {
  // const onChangeText = (newValue: string) => {
  //   const voiceBtn: HTMLDivElement | null = document.querySelector(
  //     ".VoiceInput_container__9GrD2"
  //   );

  //   const sendBtn: HTMLDivElement | null = document.querySelector(
  //     ".SendBtn_container__Y2pOh"
  //   );

  //   if (!value && newValue) {
  //     toggleButtonsVisibility(voiceBtn, sendBtn);
  //   } else if (value && !newValue) {
  //     toggleButtonsVisibility(sendBtn, voiceBtn);
  //   }

  //   setValue(newValue);
  // };

  return (
    <input
      className={styles.input}
      placeholder="Ваше сообщение..."
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export default TextInput;

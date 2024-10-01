import { ChangeEvent } from "react";
import styles from "./index.module.css";

interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
}
const TextInput = ({ value, setValue }: TextInputProps) => {
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

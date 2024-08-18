import { UiComponentProps } from "interfaces";
import styles from "./index.module.css";

const FontMenu = ({ children, className }: UiComponentProps) => {
  return (
    <a
      href="#"
      className={`${styles.link} text-[15px] medium ${
        className ? className : ""
      }`}
    >
      {children}
    </a>
  );
};

export default FontMenu;

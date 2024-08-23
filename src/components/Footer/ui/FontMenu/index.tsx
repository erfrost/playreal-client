import { UiComponentProps } from "interfaces";
import styles from "./index.module.css";
import Link from "next/link";

const FontMenu = ({ children, className }: UiComponentProps) => {
  return (
    <Link
      href="#"
      className={`${styles.link} text-[15px] medium ${
        className ? className : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default FontMenu;

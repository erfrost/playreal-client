import React, { ReactNode } from "react";
import styles from "./index.module.css";

interface PrimaryBtnProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
}
export default function PrimaryBtn({
  type,
  onClick,
  children,
  className,
}: PrimaryBtnProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${styles.container}`}
    >
      {children}
    </button>
  );
}

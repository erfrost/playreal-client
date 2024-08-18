import useClickOutside from "@/hooks/useClickOutside";
import styles from "./index.module.css";
import { ReactNode, RefObject, useRef } from "react";
import Overlay from "../Overlay";

interface DialogProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}
export default function Dialog({ children, onClose, className }: DialogProps) {
  const ref: RefObject<HTMLDivElement> = useRef(null);

  useClickOutside(ref, onClose);

  return (
    <>
      <Overlay />

      <div ref={ref} className={`${styles.container} ${className}`}>
        {children}
      </div>
    </>
  );
}

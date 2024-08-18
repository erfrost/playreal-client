import { ChangeEvent, useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import searchIcon from "public/icons/search.svg";
import closeIcon from "public/icons/close.svg";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";

interface SearchProps {
  isMobile?: boolean;
  isOpen?: boolean;
  setIsOpenInput?: (isOpen: boolean) => void;
}
const Search = ({ isMobile, isOpen, setIsOpenInput }: SearchProps) => {
  const [text, setText] = useState<string>("");

  const onEnterDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || !text) return;

    setText("");
    // Здесь будет переход на страницу поиска
  };

  useEffect(() => {
    document.addEventListener("keydown", onEnterDown);

    return () => document.removeEventListener("keydown", onEnterDown);
  }, [text]);

  useEffect(() => {
    if (!isOpen) return;

    const input: HTMLInputElement | null = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    if (!input) return;

    input.focus();
  }, [isOpen]);

  return (
    <label className={`${styles.label} ${isMobile && styles.mobileLabel}`}>
      <input
        id="searchInput"
        className={`${styles.mobileInput} ${styles.input}`}
        placeholder="Найти игру"
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      {setIsOpenInput && (
        <ImageNotDraggable
          src={closeIcon}
          alt="icon"
          className={`${styles.closeIcon} ${!isMobile && styles.displayNone}`}
          onClick={() => setIsOpenInput(false)}
        />
      )}
      <ImageNotDraggable
        src={searchIcon}
        alt="icon"
        className={`${styles.searchIcon} ${isMobile && styles.displayNone}`}
      />
    </label>
  );
};

export default Search;

import { GameWithServices } from "@/models/Game.model";
import styles from "./index.module.css";
import GameItem from "./ui/GameItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CatalogListProps {
  games: GameWithServices[] | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const CatalogList = ({ games, setIsOpen }: CatalogListProps) => {
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
    const background: HTMLDivElement | null = document.querySelector(
      ".CatalogList_background__PIBYi"
    );

    if (background) {
      background.addEventListener("click", () => setIsOpen(false));

      return background.removeEventListener("click", () => setIsOpen(false));
    } else {
      const navbar: HTMLDivElement | null = document.querySelector(
        ".Navbar_container__X9apV"
      );
      if (!navbar) return;

      function handleClickOutside(event: MouseEvent) {
        if (navbar && !navbar.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [screenWidth]);

  const disableScroll = () => {
    const body: HTMLElement | null = document.body;
    if (!body) return;

    body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    const body: HTMLElement | null = document.body;
    if (!body) return;

    body.style.overflow = "auto";
  };

  useEffect(() => {
    if (screenWidth > 825) return;

    disableScroll();

    return enableScroll;
  }, [screenWidth]);

  return (
    <div className={styles.container}>
      {screenWidth <= 825 && <div className={styles.background}></div>}
      <div className={styles.list}>
        {games?.map((game: GameWithServices) => (
          <GameItem game={game} key={game._id} setIsOpenCatalog={setIsOpen} />
        ))}
      </div>
    </div>
  );
};

export default CatalogList;

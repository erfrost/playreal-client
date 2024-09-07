import { GameWithServices } from "@/models/Game.model";
import styles from "./index.module.css";
import arrow from "/public/icons/arrowBottom.svg";
import { Dispatch, SetStateAction, useState } from "react";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import Link from "next/link";

interface Service {
  _id: string;
  name: string;
}

interface GameItemProps {
  game: GameWithServices;
  setIsOpenCatalog: Dispatch<SetStateAction<boolean>>;
}
const GameItem = ({ game, setIsOpenCatalog }: GameItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Link
        href={`/games/${game._id}`}
        // className={`${styles.name} ${isOpen && styles.openName}`}
        className={styles.name}
        onClick={() => setIsOpenCatalog(false)}
      >
        <span className={styles.title}>{game.title}</span>
        {/* <ImageNotDraggable
          src={arrow}
          alt="arrow"
          className={`${styles.icon} ${isOpen && styles.open}`}
        /> */}
      </Link>
      {/* <div className={`${styles.list} ${isOpen && styles.listOpen}`}>
        {game.services.map((service: Service) => (
          <Link
            href={`/service/${service._id}`}
            className={styles.item}
            key={service._id}
            onClick={() => setIsOpenCatalog(false)}
          >
            <span className={styles.serviceTitle}>{service.name}</span>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default GameItem;

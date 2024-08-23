import { GameWithServices } from "@/models/Game.model";
import styles from "./index.module.css";
import arrow from "/public/icons/arrowBottom.svg";
import { useState } from "react";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import Link from "next/link";

interface Service {
  _id: string;
  name: string;
}

interface GameItemProps {
  game: GameWithServices;
}
const GameItem = ({ game }: GameItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.name} ${isOpen && styles.openName}`}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <span className={styles.title}>{game.title}</span>
        <ImageNotDraggable
          src={arrow}
          alt="arrow"
          className={`${styles.icon} ${isOpen && styles.open}`}
        />
      </div>
      <div className={`${styles.list} ${isOpen && styles.listOpen}`}>
        {game.services.map((service: Service) => (
          <Link
            href={`/service/${service._id}`}
            className={styles.item}
            key={service._id}
          >
            <span className={styles.serviceTitle}>{service.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameItem;

import styles from "./index.module.css";
import Link from "next/link";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import { GameInfo } from "@/models/Game.model";

interface GameItemProps {
  game: GameInfo;
}
export default function GameItem({ game }: GameItemProps) {
  return (
    <>
      <Link
        href={`/games/${game._id}`}
        className={`${styles.container} bg-[#F5F5F5] rounded-[40px] h-[330px] flex flex-col justify-center gap-4 items-center`}
      >
        <ImageNotDraggable
          width={174}
          height={125}
          alt="image"
          src={game.image}
          className={styles.image}
        />
        <h3
          className={`${styles.title} text-2xl text-center leading-[39px] font-bold w-11/12`}
        >
          {game.title}
        </h3>
      </Link>
    </>
  );
}

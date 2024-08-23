import { GameInfo } from "@/models/Game.model";
import styles from "./index.module.css";
import { Dispatch, SetStateAction } from "react";

interface ProfileGamesSelectProps {
  games: GameInfo[];
  selectedGames: string[];
  setSelectedGames: Dispatch<SetStateAction<string[]>>;
}
const ProfileGamesSelect = ({
  games,
  selectedGames,
  setSelectedGames,
}: ProfileGamesSelectProps) => {
  const onSelectGame = (gameId: string) => {
    setSelectedGames((prevState: string[]) => {
      if (prevState.find((id: string) => id === gameId)) {
        return [...prevState].filter((id: string) => id !== gameId);
      } else {
        const arr = [...prevState];
        arr.push(gameId);
        return arr;
      }
    });
  };

  return (
    <div className={styles.container}>
      {games.map((game: GameInfo) => (
        <div
          className={`${styles.form} ${
            selectedGames.includes(game._id) && styles.active
          }`}
          key={game._id}
          onMouseDown={() => onSelectGame(game._id)}
        >
          <input
            className={styles.input}
            id={`param-${game._id}`}
            type="checkbox"
            name="radio"
          />
          <label className={styles.label} htmlFor={`param-${game._id}`}>
            {game.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProfileGamesSelect;

import { UiComponentProps } from "interfaces";

const Game = ({ children, className }: UiComponentProps) => {
  return (
    <p className={`text-[10px] text-opacity-30 ${className ? className : ""}`}>
      {children}
    </p>
  );
};

export default Game;

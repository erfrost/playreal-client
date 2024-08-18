import { UiComponentProps } from "interfaces";
import styles from "./index.module.css";

const ButtonPink = ({ children, className }: UiComponentProps) => {
  return (
    <>
      <button
        className={`${
          styles.container
        } bg-[#D681FF] h-[47px] rounded-full p-0.5 ${
          className ? className : ""
        }`}
      >
        <div className="bg-white h-full w-full rounded-full px-[30px] pt-[11px] duration-300 text-[15px] font-bold text-[#D681FF] hover:bg-[#D681FF] hover:text-white">
          {children}
        </div>
      </button>
    </>
  );
};

export default ButtonPink;

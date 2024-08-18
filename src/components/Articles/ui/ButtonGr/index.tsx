import Insc from "@/components/typography/Inscriptions";
import { UiComponentProps } from "interfaces";

const ButtonGr = ({ children, className }: UiComponentProps) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#0069E4] to-[#CC61FF] h-[24px] w-[60px] max-w-[100px] rounded-full flex box-content ${
        className ? className : ""
      }`}
    >
      <Insc className={`text-white m-auto`}>{children}</Insc>
    </div>
  );
};

export default ButtonGr;

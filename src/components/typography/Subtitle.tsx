import { UiComponentProps } from "../../../interfaces";

export default function Subtitle({ children, className }: UiComponentProps) {
  return (
    <h1
      className={`text-[64px] leading-[59px] font-bold text-[#333333] ${
        className ? className : ""
      }`}
    >
      {children}
    </h1>
  );
}

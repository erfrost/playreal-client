import { UiComponentProps } from "../../../interfaces";

export default function H4({ children, className }: UiComponentProps) {
  return (
    <div
      className={`inline-block bg-gradient-to-r from-[#0069E4] to-[#CC61FF] opacity-100
                    text-[18px] font-bold
                    text-transparent bg-clip-text
        ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}

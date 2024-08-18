import { UiComponentProps } from "../../../interfaces";

export default function Insc({ children, className }: UiComponentProps) {
  return (
    <div
      className={`text-[12px] 
        ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}

import { UiComponentProps } from "interfaces";

const Name = ({ children, className }: UiComponentProps) => {
  return (
    <div className={`text-[20px]  bold ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default Name;

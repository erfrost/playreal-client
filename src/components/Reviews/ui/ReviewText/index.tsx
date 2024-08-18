import { UiComponentProps } from "interfaces";

const ReviewText = ({ children, className }: UiComponentProps) => {
  return (
    <p
      className={`height-[50px] width-[200px] text-[15px] leading-3 ${
        className ? className : ""
      }`}
    >
      {children}
    </p>
  );
};

export default ReviewText;

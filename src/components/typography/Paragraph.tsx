import { UiComponentProps } from "../../../interfaces";

// children - проп который показывает куда сувать контент который вкладывается в компонент
// className - проп который передает кастомные стили. Нужен для гибкости компонента

// когда передаешь стили с родителя которые могут конфликтовать со стилями компонента, ставь "!" перед стилем
export default function Paragraph({ children, className }: UiComponentProps) {
  return (
    //
    <p
      className={`text-base text-[#333333] text-center ${
        className ? className : ""
      }`}
    >
      {children}
    </p>
  );
}

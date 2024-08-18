import { UiComponentProps } from "../../../interfaces";

// children - проп который показывает куда сувать контент который вкладывается в компонент
// className - проп который передает кастомные стили. Нужен для гибкости компонента

// когда передаешь стили с родителя которые могут конфликтовать со стилями компонента, ставь "!" перед стилем
export default function Title({ children, className }: UiComponentProps) {
  return (
    <h1
      className={`text-7xl text-center text-[#333333] ${
        className ? className : ""
      }`}
    >
      {children}
    </h1>
  );
}

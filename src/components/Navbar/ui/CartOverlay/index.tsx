import { ReactNode, RefObject, useRef } from "react";
import mergeInputs from "@/lib/mergeInputs";
import useClickOutside from "@/hooks/useClickOutside";
import Overlay from "@/components/Overlay";

interface Slider {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}
const CartOverlay = ({ isOpen, onClose, children, className }: Slider) => {
  const ref: RefObject<HTMLDivElement> = useRef(null);

  useClickOutside(ref, onClose);

  return (
    <>
      {isOpen && <Overlay />}
      <div
        ref={ref}
        className={mergeInputs(
          `fixed rounded-s-3xl p-7 bg-white w-11/12 md:w-1/2 max-w-[700px] h-screen top-0 z-[999] ${
            isOpen ? "right-0" : "right-full"
          }`,
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default CartOverlay;

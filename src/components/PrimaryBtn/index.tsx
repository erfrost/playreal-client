import React, { ReactNode } from "react";
import mergeInputs from "@/lib/mergeInputs";

interface PrimaryBtnProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
}
export default function PrimaryBtn({
  type,
  onClick,
  children,
  className,
}: PrimaryBtnProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={mergeInputs(
        `bg-[#D681FF] py-2 px-5 text-white rounded-md font-semibold active:translate-y-1 select-none`,
        className
      )}
    >
      {children}
    </button>
  );
}

import trustpilotIcon from "/public/trustpilot.svg";
import Image from "next/image";
import Link from "next/link";
import ReviewsLine from "./ui/ReviewsLine";
import Subtitle from "../typography/Subtitle";
import styles from "./index.module.css";
import ImageNotDraggable from "../ui/ImageNotDraggable";

export default function Reviews() {
  return (
    <div
      className={`${styles.container} w-[100%] mt-[120px] rounded-[60px] bg-gradient-to-r from-[#0069E4] to-[#CC61FF] flex flex-col gap-[30px] pb-[110px]`}
    >
      <div
        className={`${styles.texts} w-[100%] flex items-[center] gap-[25px] pt-[60px] pl-[125px]`}
      >
        <Subtitle
          className={`${styles.title} text-[50px] text-white leading-[46.01px]`}
        >
          Отзывы наших клиентов
        </Subtitle>
        <Link href="https://www.trustpilot.com/" className="cursor-[pointer]">
          <ImageNotDraggable src={trustpilotIcon} alt="trustpilot" />
        </Link>
      </div>
      <ReviewsLine />
      <ReviewsLine marginLeft="-10%" />
      <ReviewsLine marginLeft="-20%" />
    </div>
  );
}

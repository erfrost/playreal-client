import styles from "./index.module.css";
import image from "/public/service-img.png";
import arrowLeft from "/public/icons/sliderArrow.svg";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import { useState } from "react";

interface ImagesSliderProps {
  images: string[];
}
const ImagesSlider = ({ images }: ImagesSliderProps) => {
  const [isWait, setIsWait] = useState<boolean>(false);

  const handleScroll = (direction: "left" | "right") => {
    if (isWait) return;

    const list: HTMLDivElement | null = document.querySelector(
      ".ImagesSlider_list__m7vKz"
    );
    if (!list) return;

    const image: HTMLImageElement | null = list.querySelector(
      ".ImagesSlider_image__1se6L"
    );
    if (!image) return;

    const fullWidth: number = list.scrollWidth;
    const imageWidth: number = image.scrollWidth;
    const currentScroll: number = list.scrollLeft;
    const gap: number = Number(
      getComputedStyle(list).getPropertyValue("gap").slice(0, 2)
    );

    setIsWait(true);
    setTimeout(() => setIsWait(false), 600);

    if (direction === "right") {
      if (currentScroll + imageWidth + gap >= fullWidth) {
        list.scrollTo({ left: 0, behavior: "smooth" });
      } else list.scrollBy({ left: imageWidth + gap, behavior: "smooth" });
    }
    if (direction === "left") {
      if (currentScroll - imageWidth - gap < 0) {
        list.scrollTo({ left: fullWidth + gap, behavior: "smooth" });
      } else list.scrollBy({ left: -(imageWidth + gap), behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles.leftBtn}`}
        onClick={() => handleScroll("left")}
      >
        <ImageNotDraggable src={arrowLeft} alt="arrow" />
      </button>
      <div className={styles.list}>
        {images.map((image: string, index: number) => (
          <ImageNotDraggable
            src={image}
            width={350}
            height={200}
            alt="image"
            className={styles.image}
            key={index}
          />
        ))}
      </div>
      <button
        className={`${styles.btn} ${styles.rightBtn}`}
        onClick={() => handleScroll("right")}
      >
        <ImageNotDraggable
          src={arrowLeft}
          alt="arrow"
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
};

export default ImagesSlider;

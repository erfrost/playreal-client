import styles from "./index.module.css";
import Review from "../Review";
import { useEffect, useState } from "react";

interface ReviewsLineProps {
  marginLeft?: string;
}
const ReviewsLine = ({ marginLeft }: ReviewsLineProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(1920);
  const [reviewCount, setReviewCount] = useState<number>(5);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (screenWidth <= 800 && screenWidth > 585) setReviewCount(4);
    if (screenWidth <= 585) setReviewCount(3);
  }, [screenWidth]);

  return (
    <div className={styles.container}>
      <div className={styles.row} style={marginLeft ? { marginLeft } : {}}>
        <span>
          {[...Array(reviewCount)].map((_, index) => (
            <Review key={index} />
          ))}
        </span>
        <span>
          {[...Array(reviewCount)].map((_, index) => (
            <Review key={index} />
          ))}
        </span>
      </div>
    </div>
  );
};

export default ReviewsLine;

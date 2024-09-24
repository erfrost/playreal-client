import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import icon from "/public/icons/offerReview.svg";

const Review = () => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Review</span>
      <ImageNotDraggable src={icon} alt="icon" className={styles.icon} />
    </div>
  );
};

export default Review;

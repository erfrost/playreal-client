import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import icon from "/public/icons/offerTime.svg";

const AtWork = () => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>At work</span>
      <ImageNotDraggable src={icon} alt="icon" className={styles.icon} />
    </div>
  );
};

export default AtWork;

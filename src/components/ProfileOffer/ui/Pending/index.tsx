import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import icon from "/public/icons/offerPending.svg";

const Pending = () => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Pending</span>
      <ImageNotDraggable src={icon} alt="icon" className={styles.icon} />
    </div>
  );
};

export default Pending;

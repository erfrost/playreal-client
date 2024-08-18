import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import icon from "/public/icons/offerCheck.svg";

const Already = () => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Already</span>
      <ImageNotDraggable src={icon} alt="icon" />
    </div>
  );
};

export default Already;

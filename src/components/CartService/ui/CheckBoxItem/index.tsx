import styles from "./index.module.css";
import { Additional } from "@/models/Service.model";

interface CheckBoxItemProps {
  additional: Additional;
}
const CheckBoxItem = ({ additional }: CheckBoxItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <input
          className={styles.input}
          id={`param-${additional._id}`}
          type="checkbox"
          name="radio"
        />
        <label className={styles.label} htmlFor={`param-${additional._id}`}>
          {additional.title}
        </label>
      </div>
    </div>
  );
};

export default CheckBoxItem;

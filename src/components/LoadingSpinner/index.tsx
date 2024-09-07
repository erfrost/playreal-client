import styles from "./index.module.css";

interface LoadingSpinnerProps {
  size: string;
}
const LoadingSpinner = ({ size }: LoadingSpinnerProps) => {
  return (
    <div className={styles.container} style={{ width: size }}>
      <div className={`${styles.line} ${styles.line1}`}></div>
      <div className={`${styles.line} ${styles.line2}`}></div>
      <div className={`${styles.line} ${styles.line3}`}></div>
    </div>
  );
};

export default LoadingSpinner;

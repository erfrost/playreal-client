import styles from "./index.module.css";

interface SkeletonProps {
  className?: string;
  props?: any[];
}
function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={`${styles.container}${className}`} {...props} />;
}

export default Skeleton;

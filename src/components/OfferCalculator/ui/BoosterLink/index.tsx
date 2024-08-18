import { toastError, toastSuccess } from "@/lib/toastifyActions";
import styles from "./index.module.css";

interface BoosterLinkProps {
  link: string;
}
const BoosterLink = ({ link }: BoosterLinkProps) => {
  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(link);
      toastSuccess("Ссылка скопирована");
    } catch {
      toastError("Ошибка при копировании ссылки");
    }
  };

  return (
    <div className={styles.boosterLink} onClick={handleCopyLink}>
      <span className={styles.boosterLinkText}>{link}</span>
    </div>
  );
};

export default BoosterLink;

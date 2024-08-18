import { useRecoilState } from "recoil";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import styles from "./index.module.css";
import { supportIsOpenState } from "@/storage/atoms";
import timeIcon from "/public/icons/timeOffer.svg";
import PrimaryBtn from "../PrimaryBtn";

const CustomOfferBlock = () => {
  const [_, setIsSupportOpen] = useRecoilState<boolean>(supportIsOpenState);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Создайте кастомный оффер!</span>
      <div className={styles.content}>
        <div className={styles.timeContainer}>
          <div className={styles.timeTop}>
            <ImageNotDraggable src={timeIcon} alt="time" />
            <span className={styles.timeTopText}>2 minutes</span>
          </div>
          <span className={styles.timeSmallText}>Is our usual reply time</span>
        </div>
        <PrimaryBtn
          className={styles.btn}
          onClick={() => setIsSupportOpen(true)}
        >
          Создать
        </PrimaryBtn>
      </div>
    </div>
  );
};

export default CustomOfferBlock;

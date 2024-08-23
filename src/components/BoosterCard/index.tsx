import styles from "./index.module.css";
import avatar from "/public/boosterAvatar.png";
import star from "/public/icons/statStar.svg";
import hours from "/public/icons/hours.svg";
import trophy from "/public/icons/trophy.svg";
import rankTitan from "/public/rankTitan.png";
import PrimaryBtn from "../PrimaryBtn";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import { Booster } from "@/models/User.model";
import noAvatar from "/public/noAvatar.png";

interface BoosterCardProps {
  booster: Booster;
}
const BoosterCard = ({ booster }: BoosterCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.info}>
          <ImageNotDraggable
            src={booster.avatar_url || noAvatar}
            width={46}
            height={46}
            alt="avatar"
            className={styles.avatar}
          />
          <div className={styles.column}>
            <div className={styles.row}>
              {/* <div className={styles.rate}>
                <span className={styles.rateText}>4.8</span>
                <ImageNotDraggable
                  src={star}
                  alt="star"
                  className={styles.star}
                />
              </div>
              <span className={styles.game}>Dota 2</span> */}
            </div>
            <span className={styles.name}>{booster.nickname}</span>
          </div>
        </div>
        {/* <div className={styles.row} style={{ gap: "10px" }}>
          <div className={styles.infoRow}>
            <ImageNotDraggable
              src={hours}
              alt="hours"
              className={styles.miniIcon}
            />
            <span className={styles.infoText}>2368</span>
          </div>
          <div className={styles.infoRow}>
            <ImageNotDraggable
              src={trophy}
              alt="trophy"
              className={styles.miniIcon}
            />
            <span className={styles.infoText}>International 2022</span>
          </div>
        </div> */}
        {/* <ImageNotDraggable src={rankTitan} alt="rank" className={styles.rank} /> */}
      </div>
      <span className={styles.text}>
        {booster.description || "Бустер не указал информацию о себе"}
      </span>
      <PrimaryBtn className={styles.btn}>Заказать буст</PrimaryBtn>
    </div>
  );
};

export default BoosterCard;

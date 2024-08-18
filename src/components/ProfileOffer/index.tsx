import ImageNotDraggable from "../ui/ImageNotDraggable";
import styles from "./index.module.css";
import image from "/public/serviceBackground.png";
import avatar from "/public/boosterAvatar.png";
import Already from "./ui/Already";
import AtWork from "./ui/AtWork";
import Pending from "./ui/Pending";

// interface ProfileOfferProps {
//   offer: any;
// }
// const ProfileOffer = ({ offer }: ProfileOfferProps) => {
const ProfileOffer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <ImageNotDraggable src={image} alt="image" className={styles.image} />
        <div className={styles.info}>
          <span className={styles.title}>Boost dota 2 и league of legends</span>
          <span className={styles.opacitySmallText}>1147-3052</span>
        </div>
      </div>
      <div className={`${styles.block} ${styles.center}`}>
        <ImageNotDraggable src={avatar} alt="avatar" className={styles.image} />
        <div className={styles.info}>
          <span className={styles.title}>Константин</span>
          <span className={styles.opacitySmallText}>Dota 2</span>
        </div>
      </div>
      {/* <Already /> */}
      {/* <AtWork /> */}
      <Pending />
    </div>
  );
};

export default ProfileOffer;

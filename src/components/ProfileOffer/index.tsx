import ImageNotDraggable from "../ui/ImageNotDraggable";
import styles from "./index.module.css";
import { Offer } from "@/models/Offer.model";
import noAvatar from "/public/noAvatar.png";
import { useState } from "react";
import Modal from "./ui/Modal";
import { User } from "@/models/User.model";
import Status from "./ui/Status";

interface ProfileOfferProps {
  offer: Offer;
  user: User;
}
const ProfileOffer = ({ offer, user }: ProfileOfferProps) => {
  const [offerState, setOfferState] = useState<Offer>(offer);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.container} onClick={() => setIsOpen(true)}>
      <div className={styles.block}>
        <ImageNotDraggable
          src={offerState.serviceImage}
          width={48}
          height={48}
          alt="image"
          className={styles.image}
        />
        <div className={styles.info}>
          <span className={styles.title}>{offerState.title}</span>
          <span className={styles.opacitySmallText}>
            {offerState.ratingRange[0] + "-" + offerState.ratingRange[1]}
          </span>
        </div>
      </div>
      {user.role === "user" ? (
        <div className={`${styles.block} ${styles.center}`}>
          <ImageNotDraggable
            src={offerState.boosterAvatar || noAvatar}
            width={48}
            height={48}
            alt="avatar"
            className={styles.image}
          />
          <div className={styles.info}>
            <span className={styles.title}>
              {offerState.boosterName || "Не назначен"}
            </span>
            <span className={styles.opacitySmallText}>
              {offerState.gameName}
            </span>
          </div>
        </div>
      ) : (
        <div className={`${styles.block} ${styles.center}`}>
          <ImageNotDraggable
            src={offerState.userAvatar || noAvatar}
            width={48}
            height={48}
            alt="avatar"
            className={styles.image}
          />
          <div className={styles.info}>
            <span className={styles.title}>{offerState.userName}</span>
            <span className={styles.opacitySmallText}>
              {offerState.gameName}
            </span>
          </div>
        </div>
      )}
      <Status status={offerState.status} />
      {isOpen && (
        <Modal
          offer={offerState}
          userId={user._id}
          setOffer={setOfferState}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default ProfileOffer;

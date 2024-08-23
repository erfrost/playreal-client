import { Offer } from "@/models/Offer.model";
import styles from "./index.module.css";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import noAvatar from "/public/noAvatar.png";
import Link from "next/link";
import CheckBoxItem from "@/components/CartService/ui/CheckBoxItem";
import { Additional } from "@/models/Service.model";
import PrimaryBtn from "@/components/PrimaryBtn";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import acceptOffer from "@/api/offers/acceptOffer";
import { toastSuccess } from "@/lib/toastifyActions";
import Status from "../Status";

interface ModalProps {
  offer: Offer;
  userId: string;
  setOffer: Dispatch<SetStateAction<Offer>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const Modal = ({ offer, userId, setOffer, setIsOpen }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const onClose = (e: MouseEvent) => {
    if (overlayRef.current === e.target) setIsOpen(false);
  };

  useEffect(() => {
    if (!overlayRef.current) return;

    overlayRef.current.addEventListener("click", onClose);

    return () => overlayRef.current?.removeEventListener("click", onClose);
  }, [overlayRef]);

  const onClickBtn = async () => {
    if (offer.status === "Pending") {
      try {
        const acceptedOffer: Offer = await acceptOffer(offer);

        setOffer(acceptedOffer);
      } catch {
        return;
      }
    } else {
      toastSuccess("Тут переход в чат");
    }
  };

  return (
    <div className={styles.container} ref={overlayRef}>
      <div className={styles.content}>
        <span className={styles.gameName}>{offer.gameName}</span>
        <span className={styles.text}>Заказ:</span>
        <div className={styles.service}>
          <div className={styles.serviceHeader}>
            <Link href={`/service/${offer.serviceId}`}>
              <ImageNotDraggable
                src={offer.serviceImage}
                width={60}
                height={60}
                alt="service"
                className={styles.image}
              />
            </Link>
            <Link href={`/service/${offer.serviceId}`} className={styles.title}>
              {offer.title}
            </Link>
            <div className={styles.status}>
              <Status status={offer.status} />
            </div>
          </div>
          <span className={styles.rating}>
            Рейтинг: {offer.ratingRange[0] + "-" + offer.ratingRange[1]}
          </span>
          <div className={styles.additionals}>
            {offer.additionals.map((additional: Additional) => (
              <CheckBoxItem additional={additional} key={additional._id} />
            ))}
          </div>
        </div>
        {offer.userId === userId ? (
          offer.boosterId ? (
            <>
              <span className={styles.text}>Исполнитель:</span>
              <Link
                href={`/profile/${offer.boosterId}`}
                className={styles.user}
              >
                <ImageNotDraggable
                  src={offer.boosterAvatar || noAvatar}
                  width={50}
                  height={50}
                  alt="avatar"
                  className={styles.image}
                />
                <span className={styles.nickname}>{offer.boosterName}</span>
              </Link>
            </>
          ) : (
            <span className={styles.text}>Исполнитель не назначен</span>
          )
        ) : (
          <>
            <span className={styles.text}>Заказчик:</span>
            <Link href={`/profile/${offer.userId}`} className={styles.user}>
              <ImageNotDraggable
                src={offer.userAvatar || noAvatar}
                width={50}
                height={50}
                alt="avatar"
                className={styles.image}
              />
              <span className={styles.nickname}>{offer.userName}</span>
            </Link>
          </>
        )}
        {offer.userId === userId && offer.status === "Pending" ? (
          <> </>
        ) : (
          <PrimaryBtn className={styles.btn} onClick={onClickBtn}>
            {offer.status !== "Pending" && offer.boosterId
              ? "Перейти в чат"
              : "Принять заказ"}
          </PrimaryBtn>
        )}
      </div>
    </div>
  );
};

export default Modal;

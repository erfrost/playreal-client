import React, { Dispatch, SetStateAction, useState } from "react";
import { X } from "@phosphor-icons/react";
import styles from "./index.module.css";
import RemoveWindow from "./ui/RemoveWindow";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import { Additional } from "@/models/Service.model";
import CheckBoxItem from "./ui/CheckBoxItem";
import { CartItem, CartItemWithPrice } from "@/models/CartItem.model";

interface CartServiceProps {
  service: CartItemWithPrice;
  setCart: Dispatch<SetStateAction<CartItem[]>>;
}
const CartService = ({ service, setCart }: CartServiceProps) => {
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  console.log("service: ", service);
  return (
    <div className={styles.container}>
      {isRemoveOpen && (
        <RemoveWindow
          cartId={service.cartId}
          setIsOpen={setIsRemoveOpen}
          setCart={setCart}
        />
      )}
      <ImageNotDraggable
        src="/service-img.png"
        width="129"
        height="129"
        alt="image"
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.params}>
          <span className={styles.title}>{service.name}</span>
          <span className={styles.rating}>
            Рейтинг: {service.ratingRange[0] + " - " + service.ratingRange[1]}
          </span>
          <div className={styles.checkboxes}>
            {service.additionals.map((additional: Additional) => (
              <CheckBoxItem additional={additional} key={additional._id} />
            ))}
          </div>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            {service.price
              ? service.price.toLocaleString() + " ₽"
              : "Загрузка..."}
          </span>
          <button
            onClick={() => setIsRemoveOpen(true)}
            className={styles.removeBtn}
          >
            Убрать <X color="#858585" className={styles.removeBtnIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartService;

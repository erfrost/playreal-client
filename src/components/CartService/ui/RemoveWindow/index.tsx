import PrimaryBtn from "@/components/PrimaryBtn";
import styles from "./index.module.css";
import { Dispatch, SetStateAction } from "react";
import { removeFromCart } from "@/services/cart.service";
import { CartItem } from "@/models/CartItem.model";

interface RemoveWindowProps {
  cartId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCart: Dispatch<SetStateAction<CartItem[]>>;
}
const RemoveWindow = ({ cartId, setIsOpen, setCart }: RemoveWindowProps) => {
  const onDelete = () => {
    setCart((prevState: CartItem[]) =>
      [...prevState].filter((item: CartItem) => item.cartId !== cartId)
    );
    removeFromCart(cartId);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.text}>Вы уверены?</h4>
      <div className={styles.buttonGroup}>
        <PrimaryBtn
          className={`${styles.btn} ${styles.redBtn}`}
          onClick={onDelete}
        >
          Удалить
        </PrimaryBtn>
        <PrimaryBtn className={styles.btn} onClick={() => setIsOpen(false)}>
          Оставить
        </PrimaryBtn>
      </div>
    </div>
  );
};

export default RemoveWindow;

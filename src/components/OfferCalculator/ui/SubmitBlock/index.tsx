import styles from "./index.module.css";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import arrow from "/public/icons/arrowBottomBlack.svg";
import { ResultOffer, ResultValue } from "../..";
import { addInCart } from "@/services/cart.service";
import { toastSuccess } from "@/lib/toastifyActions";
import { useRecoilState } from "recoil";
import { cartState } from "@/storage/atoms";
import randomNumber from "@/lib/randomNumber";
import { CartItem } from "@/models/CartItem.model";

const calculateTotalSum = (object: ResultValue) => {
  return Object.values(object).reduce((total, value) => total + value, 0);
};

interface SubmitBlockProps {
  basePrice: number;
  price: ResultValue;
  days: ResultValue;
  resultOffer: ResultOffer;
  role: "user" | "booster" | undefined;
}
const SubmitBlock = ({
  basePrice,
  price,
  days,
  resultOffer,
  role,
}: SubmitBlockProps) => {
  const [_, setCart] = useRecoilState<CartItem[]>(cartState);
  const cartId: string = randomNumber();
  const totalPrice: number = calculateTotalSum(price);
  const totalDays: number = calculateTotalSum(days);

  const handleOpen = () => {
    const container: HTMLDivElement | null = document.querySelector(
      ".SubmitBlock_container__OjRgi"
    );
    const toogle: HTMLDivElement | null = document.querySelector(
      ".SubmitBlock_arrowContainer__KMoI2"
    );
    if (!container || !toogle) return;
    const arrow: HTMLImageElement | null = toogle.querySelector(
      ".SubmitBlock_arrow__s4xbx"
    );
    const accordion: HTMLDivElement | null =
      toogle.nextElementSibling as HTMLDivElement;
    if (!accordion || !arrow) return;

    if (
      window.getComputedStyle(accordion, null).getPropertyValue("height") ===
      "0px"
    ) {
      accordion.style.height = `${accordion.scrollHeight}px`;
      arrow.style.transform = "none";
      container.style.padding = "0 15px 15px";
    } else {
      accordion.style.height = `${accordion.scrollHeight}px`;
      window.getComputedStyle(accordion, null).getPropertyValue("height");
      accordion.style.height = "0";
      arrow.style.transform = "rotate(180deg)";
      container.style.padding = "0";
    }

    accordion.addEventListener("transitionend", () => {
      if (accordion.style.height !== "0px") {
        accordion.style.height = "auto";
      }
    });

    return accordion.removeEventListener("transitionend", () => {
      if (accordion.style.height !== "0px") {
        accordion.style.height = "auto";
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} onClick={handleOpen}>
        <ImageNotDraggable src={arrow} alt="arrow" className={styles.arrow} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.price}>
          {Math.ceil(basePrice + totalPrice).toLocaleString()} ₽
        </h3>
        <div className={styles.info}>
          <h4 className={styles.deadlines}>{Math.ceil(totalDays)} дней</h4>
          <span className={styles.name}>На буст</span>
        </div>
        {(!role || role === "user") && (
          <button
            className={styles.submitBtn}
            onClick={() => {
              addInCart({ ...resultOffer, cartId });
              setCart((prevState: CartItem[]) => [
                ...prevState,
                { ...resultOffer, cartId },
              ]);
              toastSuccess("Товар добавлен в корзину");
            }}
          >
            В корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default SubmitBlock;

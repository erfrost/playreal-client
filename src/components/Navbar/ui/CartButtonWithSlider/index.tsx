import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import ItemsCount from "../ItemsCount";
import CartService from "@/components/CartService";
import styles from "./index.module.css";
import PrimaryBtn from "@/components/PrimaryBtn";
import closeIcon from "/public/icons/close.svg";
import CartOverlay from "../CartOverlay";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import { getCart } from "@/services/cart.service";
import { useRecoilState } from "recoil";
import { cartState } from "@/storage/atoms";
import getCartItemPrice from "@/api/services/getCartItemPrice";
import { CartItem, CartItemWithPrice } from "@/models/CartItem.model";
import { toastError, toastSuccess, toastWarning } from "@/lib/toastifyActions";
import axiosInstance from "axios.config";
import { deleteCookie, setCookie } from "cookies-next";
import createOffer from "@/api/offers/createOffer";
import { AxiosResponse } from "axios";
import { Offer } from "@/models/Offer.model";

const CartButtonWithSlider = () => {
  const [cart, setCart] = useRecoilState<CartItem[]>(cartState);
  const [cartWithPrice, setCartWithPrice] = useState<CartItemWithPrice[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    (async () => {
      const cartWithPrice: CartItemWithPrice[] = await Promise.all(
        cart.map(async (cartItem: CartItem) => {
          const price: number = await getCartItemPrice(cartItem);
          return {
            ...cartItem,
            price,
          };
        })
      );

      setCartWithPrice(cartWithPrice);
    })();
  }, [cart]);

  useEffect(() => {
    const totalPrice: number = Math.ceil(
      cartWithPrice.reduce(
        (acc: number, cartItem: CartItemWithPrice) => acc + cartItem.price,
        0
      )
    );

    setTotalPrice(totalPrice);
  }, [cartWithPrice]);

  useEffect(() => {
    const body = document.body;

    if (isCartOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  const onCreateOffer = async () => {
    if (!cart.length) return toastWarning("Корзина пуста");

    const offers: Offer[] = await createOffer(cart);

    if (!offers) return;

    setCart([]);
    deleteCookie("cart");
    toastSuccess("Успешно");
  };

  return (
    <>
      <div
        onClick={() => !isCartOpen && setIsCartOpen(true)}
        className={styles.btn}
      >
        <ShoppingCart color="#D681FF" size={28} />
        <ItemsCount count={cart?.length || 0} />

        {isCartOpen && (
          <>
            <CartOverlay
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              className={styles.overlay}
            >
              <ImageNotDraggable
                src={closeIcon}
                alt="close"
                className={styles.closeIcon}
                onClick={() => setIsCartOpen(false)}
              />
              <div className={styles.list}>
                {cartWithPrice.map((item: CartItemWithPrice) => (
                  <CartService
                    service={item}
                    setCart={setCart}
                    key={item.cartId}
                  />
                ))}
              </div>
              <div className={styles.footer}>
                <div className={styles.footerContent}>
                  <span className={styles.footerText}>Total cost:</span>
                  <h2 className={styles.totalPrice}>
                    {totalPrice || totalPrice === 0
                      ? Math.ceil(totalPrice).toLocaleString() + " ₽"
                      : "Загрузка..."}
                  </h2>
                </div>
                <PrimaryBtn
                  className={styles.submitBtn}
                  onClick={onCreateOffer}
                >
                  Checkout
                </PrimaryBtn>
              </div>
            </CartOverlay>
          </>
        )}
      </div>
    </>
  );
};

export default CartButtonWithSlider;

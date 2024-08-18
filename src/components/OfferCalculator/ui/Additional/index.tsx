import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./index.module.css";
import { ResultOffer, ResultValue } from "../..";
import { Additional } from "@/models/Service.model";

interface CheckBoxItemProps {
  additional: Additional;
  setResultOffer: Dispatch<SetStateAction<ResultOffer>>;
  setResultPrice: Dispatch<SetStateAction<ResultValue>>;
  setResultDays: Dispatch<SetStateAction<ResultValue>>;
}
const AdditionalItem = ({
  additional,
  setResultOffer,
  setResultPrice,
  setResultDays,
}: CheckBoxItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onActive = (value: boolean) => {
    setIsActive(value);

    if (value) {
      setResultOffer((prevState: ResultOffer) => {
        return {
          ...prevState,
          additionals: [...prevState.additionals, additional],
        };
      });

      setResultPrice((prevState: ResultValue) => {
        const obj: ResultValue = { ...prevState };
        obj.additionals += additional.price;
        return obj;
      });
      setResultDays((prevState: ResultValue) => {
        const obj: ResultValue = { ...prevState };
        obj.additionals += additional.days;
        return obj;
      });
    } else {
      setResultOffer((prevState: ResultOffer) => {
        return {
          ...prevState,
          additionals: prevState.additionals.filter(
            (item: Additional) => item._id !== additional._id
          ),
        };
      });

      setResultPrice((prevState: ResultValue) => {
        const obj: ResultValue = { ...prevState };
        obj.additionals -= additional.price;
        return obj;
      });
      setResultDays((prevState: ResultValue) => {
        const obj: ResultValue = { ...prevState };
        obj.additionals -= additional.days;
        return obj;
      });
    }
  };

  return (
    <div
      className={`${styles.container} ${isActive && styles.activeContainer}`}
    >
      <div className={styles.left}>
        <input
          className={styles.input}
          id={`param-${additional._id}`}
          type="checkbox"
          name="radio"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onActive(e.target.checked)
          }
        />
        <label className={styles.label} htmlFor={`param-${additional._id}`}>
          {additional.title}
        </label>
      </div>
      <span className={styles.price}>+{additional.price} ₽</span>
    </div>
  );
};

export default AdditionalItem;

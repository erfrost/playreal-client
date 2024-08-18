import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./index.module.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { ResultOffer, ResultValue } from "../..";
import {
  calculateRangeDays,
  calculateRangePrice,
} from "@/lib/calculateRangeInput";

interface RangeInputProps {
  ratingRange: number[];
  baseMmrPrice: number;
  baseMmrDays: number;
  coefficientMmr: number;
  setResultOffer: Dispatch<SetStateAction<ResultOffer>>;
  setResultPrice: Dispatch<SetStateAction<ResultValue>>;
  setResultDays: Dispatch<SetStateAction<ResultValue>>;
}
const RangeInput = ({
  ratingRange,
  baseMmrPrice,
  baseMmrDays,
  coefficientMmr,
  setResultOffer,
  setResultPrice,
  setResultDays,
}: RangeInputProps) => {
  const [value, setValue] = useState<number[]>([
    ratingRange[0],
    ratingRange[1],
  ]);
  const [saveFlag, setSaveFlag] = useState<boolean>(false);

  useEffect(() => {
    const newValue: number = value[1] - value[0];

    setResultOffer((prevState) => ({
      ...prevState,
      ratingRange: value,
    }));

    if (newValue > 0) {
      setResultPrice((prevState) => ({
        ...prevState,
        ratingRange: calculateRangePrice(
          value[0],
          value[1],
          baseMmrPrice,
          coefficientMmr
        ),
      }));

      setResultDays((prevState) => {
        return {
          ...prevState,
          ratingRange: calculateRangeDays(value, baseMmrDays),
        };
      });
    }
  }, [saveFlag]);

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <input
          className={styles.input}
          placeholder="0"
          value={value[0]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue((prevState: number[]) => {
              const currentValue: string = e.target.value;
              const parseValue: number = parseInt(currentValue) || 0;

              if (!isNaN(parseValue)) {
                const arr: number[] = [...prevState];
                arr[0] = parseValue;
                return arr;
              } else return prevState;
            })
          }
          onBlur={() => {
            setValue((prevState: number[]) => {
              if (prevState[0] < ratingRange[0]) {
                return [ratingRange[0], prevState[1]];
              } else if (prevState[0] >= prevState[1]) {
                return [ratingRange[0], prevState[1]];
              } else return prevState;
            });
            setSaveFlag((prevState: boolean) => !prevState);
          }}
        />
        <input
          className={styles.input}
          placeholder="0"
          value={value[1]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue((prevState) => {
              const currentValue: string = e.target.value;
              const parseValue: number = parseInt(currentValue) || 0;

              if (!isNaN(parseValue)) {
                const arr: number[] = [...prevState];
                arr[1] = parseValue;
                return arr;
              } else return prevState;
            })
          }
          onBlur={() => {
            setValue((prevState: number[]) => {
              if (prevState[1] > ratingRange[1]) {
                return [prevState[0], ratingRange[1]];
              } else if (prevState[0] >= prevState[1]) {
                console.log("error");
                return [prevState[0], ratingRange[1]];
              } else return prevState;
            });
            setSaveFlag((prevState: boolean) => !prevState);
          }}
        />
      </div>
      <RangeSlider
        min={ratingRange[0]}
        max={ratingRange[1]}
        step={1}
        defaultValue={[ratingRange[0], ratingRange[1]]}
        value={value}
        onInput={(newValue: number[]) => {
          if (newValue[0] === newValue[1]) {
            if (newValue[0] === 0) setValue([newValue[0], newValue[1] + 1]);
            else setValue([newValue[0] - 1, newValue[1]]);
          } else setValue(newValue);
          setSaveFlag((prevState: boolean) => !prevState);
        }}
        className={styles.rangeSlider}
      />
      <div className={styles.minMaxValues}>
        <span className={styles.value}>{ratingRange[0]}</span>
        <span className={styles.value}>{ratingRange[1]}</span>
      </div>
    </div>
  );
};

export default RangeInput;

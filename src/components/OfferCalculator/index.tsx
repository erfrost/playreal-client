import styles from "./index.module.css";
import RangeInput from "./ui/RangeInput";
import BoosterLink from "./ui/BoosterLink";
import CheckBoxItem from "./ui/Additional";
import SubmitBlock from "./ui/SubmitBlock";
import { Additional, Service } from "@/models/Service.model";
import { useState } from "react";

export interface ResultOffer {
  serviceId: string;
  ratingRange: number[];
  additionals: Additional[];
}
export interface ResultValue {
  ratingRange: number;
  additionals: number;
}
interface OfferCalculatorProps {
  service: Service;
}
const OfferCalculator = ({ service }: OfferCalculatorProps) => {
  const [resultOffer, setResultOffer] = useState<ResultOffer>({
    serviceId: service._id,
    ratingRange: service.ratingRange,
    additionals: [],
  });
  const [resultPrice, setResultPrice] = useState<ResultValue>({
    ratingRange:
      (service.ratingRange[1] - service.ratingRange[0]) * service.baseMmrPrice,
    additionals: 0,
  });
  const [resultDays, setResultDays] = useState<ResultValue>({
    ratingRange:
      (service.ratingRange[1] - service.ratingRange[0]) * service.baseMmrDays,
    additionals: 0,
  });

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h4 className={styles.title}>До какого лвла бустить</h4>
        <RangeInput
          ratingRange={service.ratingRange}
          baseMmrPrice={service.baseMmrPrice}
          baseMmrDays={service.baseMmrDays}
          coefficientMmr={service.coefficientMmr}
          setResultOffer={setResultOffer}
          setResultPrice={setResultPrice}
          setResultDays={setResultDays}
        />
      </div>
      <div className={styles.block}>
        <h4 className={styles.title}>Ссылка на бустера</h4>
        <BoosterLink link={service.boosterLink} />
      </div>
      <div className={styles.block}>
        <div className={styles.paramsContainer}>
          {service.additionals.map((additional: Additional) => (
            <CheckBoxItem
              additional={additional}
              setResultOffer={setResultOffer}
              setResultPrice={setResultPrice}
              setResultDays={setResultDays}
              key={additional._id}
            />
          ))}
        </div>
      </div>
      <SubmitBlock
        basePrice={service.basePrice}
        price={resultPrice}
        days={resultDays}
        resultOffer={resultOffer}
      />
    </div>
  );
};

export default OfferCalculator;

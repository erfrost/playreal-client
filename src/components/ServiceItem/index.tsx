import styles from "./index.module.css";
import PrimaryBtn from "../PrimaryBtn";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import { ServiceInfo } from "@/models/Service.model";

interface ServiceItemProps {
  service: ServiceInfo;
}
const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className={styles.container}>
      <ImageNotDraggable
        src={service.backgroundCard}
        width={150}
        height={150}
        alt="background"
        className={styles.background}
      />
      <div className={styles.content}>
        <h4 className={styles.title}>{service.name}</h4>
        {service.params.length && (
          <ul className={styles.params}>
            {service.params.map((param: string, index: number) => (
              <li className={styles.paramsItem} key={index}>
                {param}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.footer}>
          <span className={styles.price}>
            От {service.basePrice.toLocaleString()} ₽
          </span>
          <a href={`/service/${service._id}`}>
            <PrimaryBtn className={styles.btn}>К услуге</PrimaryBtn>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;

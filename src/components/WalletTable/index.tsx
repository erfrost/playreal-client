import { Payment, PaymentItem } from "@/models/Payment.model";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

const formatDate = (dateString: string) => {
  const date: Date = new Date(dateString);

  const day: string = String(date.getUTCDate()).padStart(2, "0");
  const month: string = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year: number = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

const getAmountClass = (type: "payment" | "withdrawal" | "receiving") => {
  if (type === "payment" || type === "withdrawal") return styles.minus;
  else return styles.plus;
};

interface WalletTableProps {
  payments: Payment[];
}
const WalletTable = ({ payments }: WalletTableProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(1920);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const onMouseOver = (paymentId: string) => {
    const currentPayment: Payment | undefined = payments.find(
      (payment: Payment) => payment._id === paymentId
    );
    if (currentPayment?.name) return;

    const tooltip: HTMLUListElement | null = document.getElementById(
      `tooltip-${paymentId}`
    ) as HTMLUListElement | null;
    if (!tooltip) return;

    tooltip.style.display = "block";
    setTimeout(() => (tooltip.style.opacity = "1"), 0);
  };

  const onMouseLeave = (paymentId: string) => {
    const tooltip: HTMLUListElement | null = document.getElementById(
      `tooltip-${paymentId}`
    ) as HTMLUListElement | null;
    if (!tooltip) return;

    tooltip.style.opacity = "0";
    setTimeout(() => (tooltip.style.display = "none"), 300);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Инфо</th>
          {screenWidth > 600 && <th>Тип</th>}
          {screenWidth > 750 && <th>Статус</th>}
          <th>Сумма</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment: Payment) => (
          <tr key={payment._id}>
            <td className={styles.name}>
              <span
                className={styles.nameText}
                onMouseOver={() => onMouseOver(payment._id)}
                onMouseLeave={() => onMouseLeave(payment._id)}
              >
                {payment.name ||
                  payment.items
                    ?.map((item: PaymentItem) => item.name)
                    .join(", ")
                    .slice(0, 20) +
                    (payment.items!.join(", ").length > 20 ? "..." : "")}
              </span>
              <div className={styles.tooltip} id={`tooltip-${payment._id}`}>
                <ul>
                  {payment.items?.map((item: PaymentItem, index: number) => (
                    <li key={index} className={styles.listElement}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
            {screenWidth > 600 && <td>{payment.type}</td>}
            {screenWidth > 750 && <td>{payment.status}</td>}
            <td className={`${styles.amount} ${getAmountClass(payment.type)}`}>
              {payment.amount.toLocaleString()} ₽
            </td>
            <td>{formatDate(payment.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WalletTable;

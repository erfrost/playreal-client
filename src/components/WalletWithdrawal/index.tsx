import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./index.module.css";
import PrimaryBtn from "../PrimaryBtn";
import withdrawalCreate from "@/api/payment/withdrawalCreate";

interface WalletWithdrawalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const WalletWithdrawal = ({ setIsOpen }: WalletWithdrawalProps) => {
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleClickOutside = (e: MouseEvent) => {
    const container: HTMLDivElement | null = document.querySelector(
      ".WalletWithdrawal_container__EdL7Z"
    );
    if (!container) return;

    if (e.target === container) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const onCreateRequest = async () => {
    if (!amount || !address) return;

    await withdrawalCreate(amount, address);

    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.title}>Вывод средств</span>
        <span className={styles.text}>
          Временно вывод средств осуществляется вручную исключительно через USDT
          (TRC20). Пожалуйста, укажите ваш адрес кошелька. Администратор
          произведет перевод в течение 2 рабочих дней.
        </span>
        <input
          className={styles.input}
          placeholder="Сумма"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
        />
        <textarea
          className={`${styles.input} ${styles.textArea}`}
          placeholder="Адрес кошелька"
          value={address}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setAddress(e.target.value)
          }
        />
        <PrimaryBtn
          className={`${styles.btn} ${
            (!address || !amount) && styles.disabled
          }`}
          onClick={onCreateRequest}
        >
          Создать заявку на вывод
        </PrimaryBtn>
      </div>
    </div>
  );
};

export default WalletWithdrawal;

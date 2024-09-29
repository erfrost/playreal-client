import WalletPageSEO from "@/SEO/WalletPageSEO";
import getAllPayment from "@/api/payment/getAllPayments";
import getBalance from "@/api/users/getBalance";
import getRole from "@/api/users/getRole";
import WalletTable from "@/components/WalletTable";
import { Payment } from "@/models/Payment.model";
import styles from "@/styles/wallet.module.css";
import { Wallet as WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Wallet = () => {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setBalance(await getBalance());
      setPayments(await getAllPayment());
      setRole(await getRole());
    })();
  }, []);

  if (!payments) return null;

  return (
    <>
      <WalletPageSEO />
      <div className={styles.container}>
        <div className={styles.content}>
          {role === "booster" && (
            <div className={styles.balanceContainer}>
              <div className={styles.circle}>
                <WalletIcon color="white" />
              </div>
              <div className={styles.balanceContent}>
                <span className={styles.balanceValue}>
                  {balance ? balance.toLocaleString() : "0"} ₽
                </span>
                <button className={styles.btn}>Вывести</button>
              </div>
            </div>
          )}
          <span className={styles.tableTitle}>История операций</span>
          <WalletTable payments={payments} />
        </div>
      </div>
    </>
  );
};

export default Wallet;

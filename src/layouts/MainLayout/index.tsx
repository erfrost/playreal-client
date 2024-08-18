import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Inter, Play } from "next/font/google";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./index.module.css";
import { RecoilRoot } from "recoil";
import Support from "./ui/Support";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  style: "normal",
  subsets: ["latin", "cyrillic"],
});
const play = Play({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin", "cyrillic"],
});

interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <RecoilRoot>
      <div
        className={`${styles.container} ${inter.className} ${play.className}`}
      >
        <header className="w-full bg-[#ffffff] ">
          <Navbar />
        </header>

        <div className={styles.content}>{children}</div>
        <Footer />
        <ToastContainer />
        <Support />
      </div>
    </RecoilRoot>
  );
};

export default MainLayout;

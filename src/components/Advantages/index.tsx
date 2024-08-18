import Subtitle from "../typography/Subtitle";
import styles from "./index.module.css";
import FirstCard from "./ui/FirstCard";
import SecondCard from "./ui/SecondCard";

interface AdvantagesProps {
  isHomePage?: boolean;
}
export default function Advantages({ isHomePage }: AdvantagesProps) {
  return (
    <>
      <div
        className={`${styles.container} ${
          isHomePage && styles.homePageContainer
        } max-w-[1160px] mx-auto mt-[120px]`}
      >
        <Subtitle className={`${styles.title} mb-[52px]`}>
          Наши преимущества
        </Subtitle>

        <div className=" mt-[30px] max-w-[960px] min-w-[100%]">
          <FirstCard />
          <SecondCard />
        </div>
      </div>
    </>
  );
}

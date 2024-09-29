import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";
import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";
import { useEffect } from "react";
import styles from "@/styles/index.module.css";
import GameItem from "@/components/GameItem";
import Advantages from "@/components/Advantages";
import Reviews from "@/components/Reviews";
import Articles from "@/components/Articles";
import { GameInfo } from "@/models/Game.model";
import MainPageSEO from "@/SEO/MainPageSEO";

interface IndexProps {
  games: GameInfo[] | undefined;
  error: string | undefined;
}
const Home = ({ games, error }: IndexProps) => {
  useEffect(() => {
    if (error) toastError(error);
  }, []);

  return (
    <>
      <MainPageSEO />
      <main className={styles.container}>
        <div className={`${styles.background} w-auto mx-auto pb-20`}>
          <div className="mx-auto flex flex-col items-center max-w-[2000px]">
            <Title className={styles.title}>Boosting in popular games</Title>

            <Paragraph className={styles.subtitle}>
              Мы занимаемся более 10 лет бустингом во всех популярных играх и
              даём гарантию буста
            </Paragraph>
          </div>
        </div>

        <div
          className={`${styles.blockBlueContainer} bg-gradient-to-r from-[#0069E4] to-[#CC61FF] mx-auto w-screen max-w-[1160px] rounded-[30px] -mt-10`}
          style={{ transform: "translateY(-15px)" }}
        >
          <div
            className={`${styles.blockBlue} flex flex-row justify-between w-1140 h-75 mt-[-20px] mx-5 py-5`}
          >
            <div className={`${styles.blockBlueItem} box-content`}>
              <h3 className="text-[40px] leading-[46px] font-bold text-white">
                200+
              </h3>
              <p className="text-[15px] leading-[22px] font-medium text-white">
                Людям помогли повысить свой ранг
              </p>
            </div>

            <div className={`${styles.blockBlueItem} box-content`}>
              <h3 className="text-[40px] leading-[46px] font-bold text-white">
                4.8
              </h3>
              <p className="text-[15px] leading-[22px] font-medium text-white">
                Средние отзывы наших клиентов
              </p>
            </div>

            <div className={`${styles.blockBlueItem} box-content`}>
              <h3 className="text-[40px] leading-[46px] font-bold text-white">
                50+
              </h3>
              <p className="text-[15px] leading-[22px] font-medium text-white">
                Профессиональных бустеров
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.gamesContainer} max-w-[1160px] mx-auto`}>
          <Subtitle className={`${styles.gamesTitle} mt-[60px] mb-[50px]`}>
            Выберите игру
          </Subtitle>
          <div
            className={`${styles.grid} grid grid-cols-3 grid-rows-2 gap-10 justify-between`}
          >
            {games &&
              games.map((game: GameInfo) => (
                <GameItem key={game._id} game={game} />
              ))}
          </div>
        </div>

        <Advantages isHomePage />
        <Reviews />
        <Articles />
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("games/all");

    return {
      props: {
        games: res.data.games,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error:
          error?.response?.data?.message ||
          "При получении информации о пользователе произошла ошибка",
      },
    };
  }
};

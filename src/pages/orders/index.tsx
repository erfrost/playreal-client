import getAllGames from "@/api/games/getAllGames";
import getAllOffers from "@/api/offers/getAllOffers";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import GamesSelect from "@/components/GamesSelect";
import PrimaryBtn from "@/components/PrimaryBtn";
import { GameInfo } from "@/models/Game.model";
import { Offer } from "@/models/Offer.model";
import styles from "@/styles/orders.module.css";
import { useEffect, useState } from "react";
import arrow from "/public/icons/sliderArrow.svg";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import ProfileOffer from "@/components/ProfileOffer";
import { User } from "@/models/User.model";
import getProfile from "@/api/users/getProfile";
import debounce from "@/lib/debouce";

const Orders = () => {
  const [user, setUser] = useState<User | null>(null);
  const [games, setGames] = useState<GameInfo[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const handleClickOutside = (e: MouseEvent) => {
    const toggle: HTMLButtonElement | null = document.querySelector(
      ".orders_toggle__RKHip"
    );
    const filter: HTMLDivElement | null = document.getElementById(
      "filter"
    ) as HTMLDivElement | null;

    if (!toggle || !filter) return;

    if (
      !toggle.contains(e.target as Node) &&
      !filter.contains(e.target as Node)
    ) {
      setIsOpenFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    (async () => {
      const games: GameInfo[] = await getAllGames();
      setGames(games);

      const gamesIds: string[] = games.map((game: GameInfo) => game._id);
      setSelectedGames(gamesIds);

      setUser(await getProfile());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selectedGames.length) return setOffers([]);

      setOffers(await getAllOffers(selectedGames));
    })();
  }, [selectedGames]);

  return (
    <div className={styles.container}>
      <BreadcrumbNav
        theme="dark"
        routes={[
          {
            title: "Главная",
            path: "/",
          },
          {
            title: "Заказы",
            path: "/orders",
          },
        ]}
      />
      {user && (
        <div className={styles.content}>
          <h1 className={styles.title}>Заказы</h1>
          <div className={styles.filter}>
            <PrimaryBtn
              className={styles.toggle}
              onClick={() =>
                setIsOpenFilter((prevState: boolean) => !prevState)
              }
            >
              <span className={styles.toggleText}>Фильтр по играм</span>
              <ImageNotDraggable
                src={arrow}
                alt="arrow"
                className={styles.arrow}
              />
            </PrimaryBtn>
            {isOpenFilter && (
              <div className={styles.filterContent} id="filter">
                <GamesSelect
                  games={games}
                  selectedGames={selectedGames}
                  setSelectedGames={setSelectedGames}
                />
              </div>
            )}
          </div>
          <div className={styles.list}>
            {offers?.length ? (
              offers.map((offer: Offer) => (
                <ProfileOffer user={user} offer={offer} key={offer._id} />
              ))
            ) : (
              <span className={styles.nullText}>Ничего не найдено</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

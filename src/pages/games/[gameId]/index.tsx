import React, { useEffect } from "react";
import styles from "@/styles/services.module.css";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ServiceItem from "@/components/ServiceItem";
import Advantages from "@/components/Advantages";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";
import { toastError } from "@/lib/toastifyActions";
import { Game, GameInfo } from "@/models/Game.model";
import { ServiceInfo } from "@/models/Service.model";
import { GetStaticProps } from "next";

interface ServicesProps {
  game: Game | undefined;
  services: ServiceInfo[] | undefined;
  error: string | undefined;
}
const Services = ({ game, services, error }: ServicesProps) => {
  useEffect(() => {
    if (error) toastError(error);
  }, []);

  if (!game || !services) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BreadcrumbNav
          routes={[
            {
              title: "Главная",
              path: "/",
            },
            {
              title: game.title,
              path: `/games/${game._id}`,
            },
          ]}
          theme="dark"
        />
        <h1 className={styles.title}>{game.title}</h1>
        <h3 className={styles.subtitle}>{game.description}</h3>
      </div>
      <div className={styles.catalog}>
        <h2 className={styles.catalogTitle}>Каталог</h2>
        <div className={styles.catalogGrid}>
          {services.map((service: ServiceInfo) => (
            <ServiceItem key={service._id} service={service} />
          ))}
        </div>
      </div>
      <Advantages />
    </div>
  );
};

export const getStaticPaths = async () => {
  try {
    const response = await axiosInstance.get("games/all");

    const paths = response.data.games.map((game: GameInfo) => ({
      params: { gameId: game._id },
    }));

    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params)
      return {
        props: {
          error: "На сервере произошла ошибка",
        },
      };

    const gameId: string = params.gameId as string;

    const gameResponse: AxiosResponse = await axiosInstance.get(
      `games/by_id/${gameId}/`
    );
    const servicesResponse: AxiosResponse = await axiosInstance.get(
      `services/by_gameId/${gameId}/`
    );

    return {
      props: {
        game: gameResponse.data.game,
        services: servicesResponse.data.services,
        revalidate: 60,
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

export default Services;

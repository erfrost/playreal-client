import BreadcrumbNav from "@/components/BreadcrumbNav";
import styles from "@/styles/serviceOffer.module.css";
import starIcon from "/public/icons/statStar.svg";
import arrowIcon from "/public/icons/trustpilotArrow.svg";
import ImagesSlider from "@/components/ImagesSlider";
import Accordion from "@/components/Accordion";
import OfferCalculator from "@/components/OfferCalculator";
import BoosterCard from "@/components/BoosterCard";
import ServiceItem from "@/components/ServiceItem";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";
import { Requirement, Service, ServiceInfo } from "@/models/Service.model";
import { useEffect, useState } from "react";
import { toastError } from "@/lib/toastifyActions";
import { GameInfo } from "@/models/Game.model";
import Link from "next/link";
import getRole from "@/api/users/getRole";
import { Booster } from "@/models/User.model";
import ServiceItemPageSEO from "@/SEO/ServiceItemPageSEO";

interface ServiceProps {
  service: Service | undefined;
  game: GameInfo | undefined;
  additionalServices: ServiceInfo[] | undefined;
  boosters: Booster[] | undefined;
  error: string | undefined;
}
const ServiceOffer = ({
  service,
  game,
  additionalServices,
  boosters,
  error,
}: ServiceProps) => {
  const [role, setRole] = useState<"user" | "booster" | undefined>(undefined);
  useEffect(() => {
    if (error) toastError(error);

    (async () => {
      setRole(await getRole());
    })();
  }, []);

  if (!service || !game || !additionalServices) return null;

  return (
    <>
      <ServiceItemPageSEO
        serviceId={service._id}
        serviceName={service.name}
        serviceImage={service.backgroundCard}
        gameName={game.title}
      />
      <div className={styles.container}>
        <div
          className={styles.header}
          style={{ backgroundImage: `url(${service.backgroundHeader})` }}
        >
          <BreadcrumbNav
            routes={[
              {
                title: "Главная",
                path: "/",
              },
              {
                title: game?.title,
                path: `/games/${game._id}`,
              },
              {
                title: service.name,
                path: `/service/${service._id}`,
              },
            ]}
            theme="white"
          />
          <h1 className={styles.title}>{service.name}</h1>
          <div className={styles.statsGroup}>
            <div className={styles.statBtn}>
              <span className={styles.statBtnText}>4.8</span>
              <ImageNotDraggable
                src={starIcon}
                alt="star"
                style={{ alignSelf: "flex-start" }}
              />
            </div>
            <Link href="https://www.trustpilot.com/" className={styles.statBtn}>
              <span className={styles.statBtnText}>Trustpilot</span>
              <ImageNotDraggable src={arrowIcon} alt="arrow" />
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.block}>
              <h3 className={styles.h3}>Описание услуги</h3>
              <span className={styles.defaultText}>{service.title}</span>
            </div>
            <div className={styles.block}>
              <h4 className={styles.h4}>Изображения</h4>
              <ImagesSlider images={service.images} />
            </div>
            <div className={styles.block}>
              <h3 className={styles.h3}>Требования</h3>
              <span className={styles.defaultText}>
                {service.requirementsTitle}
              </span>
              {service.requirements.map((requirement: Requirement) => (
                <Accordion key={requirement._id} requirement={requirement} />
              ))}
            </div>
          </div>
          <OfferCalculator service={service} role={role} />
          {role !== "user" && boosters?.length ? (
            <div className={styles.footerBlock}>
              <h2 className={styles.h2}>Выберите бустера</h2>
              <span className={styles.boostersText}>
                Наши бустеры - профессионалы своего дела со стажем от 3 лет. Они
                знают все тонкости повышения рейтинга в разных играх. Доверьте
                улучшение аккаунта настоящим экспертам!
              </span>
              <div className={styles.boostersList}>
                {boosters.map((booster: Booster) => (
                  <BoosterCard booster={booster} key={booster._id} />
                ))}
              </div>
            </div>
          ) : null}
          {additionalServices.length ? (
            <div className={styles.footerBlock}>
              <h2 className={styles.h2}>Вам может понравиться</h2>
              <div className={styles.servicesList}>
                {additionalServices.map((service: ServiceInfo) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  try {
    const response = await axiosInstance.get("services/all");

    const paths = response.data.services.map((service: { _id: string }) => ({
      params: { serviceId: service._id },
    }));

    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    if (!params)
      return {
        props: {
          error: "На сервере произошла ошибка",
        },
      };

    const serviceId: string = params.serviceId;

    const serviceResponse: AxiosResponse = await axiosInstance.get(
      `services/by_id/${serviceId}`
    );
    const service: Service = serviceResponse.data.service;
    const gameId: string = service.gameId;

    const gameResponse: AxiosResponse = await axiosInstance.get(
      `games/by_id/${gameId}`
    );

    const additionalServices: AxiosResponse = await axiosInstance.get(
      `services/by_gameId/additional/${gameId}?currentServiceId=${service._id}`
    );

    const boosters: AxiosResponse = await axiosInstance.get(
      `users/boosters/${gameId}`
    );

    return {
      props: {
        service,
        game: gameResponse.data.game,
        additionalServices: additionalServices.data.services,
        boosters: boosters.data.boosters,
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

export default ServiceOffer;

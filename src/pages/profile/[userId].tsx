import BreadcrumbNav from "@/components/BreadcrumbNav";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "@/styles/user.module.css";
import star from "/public/icons/statStar.svg";
import { useEffect } from "react";
import { User } from "@/models/User.model";
import axiosInstance from "axios.config";
import { GetStaticProps } from "next";
import { AxiosResponse } from "axios";
import { toastError } from "@/lib/toastifyActions";
import noAvatar from "public/noAvatar.png";
import ProfilePageSEO from "@/SEO/ProfilePageSEO";

interface BoosterProps {
  user: User | undefined;
  error: string | undefined;
}
const Booster = ({ user, error }: BoosterProps) => {
  useEffect(() => {
    if (error) toastError(error);
  });

  if (!user) return null;

  return (
    <>
      <ProfilePageSEO userId={user._id} userName={user.nickname} />
      <div className={styles.container}>
        {user && (
          <>
            <BreadcrumbNav
              theme="dark"
              routes={[
                {
                  title: "Главная",
                  path: "/",
                },
                {
                  title: user.nickname,
                  path: `/booster/${user._id}`,
                },
              ]}
            />
            <div className={styles.content}>
              <div className={styles.main}>
                <ImageNotDraggable
                  src={user.avatar_url || noAvatar}
                  width={100}
                  height={100}
                  alt="avatar"
                  className={styles.avatar}
                />
                <div className={styles.mainContent}>
                  <div className={styles.mainStats}>
                    <div className={styles.pinkBtn}>God of boosting</div>
                    <div className={styles.ratingBtn}>
                      <span className={styles.ratingBtnText}>4.8</span>
                      <ImageNotDraggable
                        src={star}
                        alt="star"
                        className={styles.star}
                      />
                    </div>
                  </div>
                  <h1 className={styles.name}>{user.nickname}</h1>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.infoTitle}>Обо мне</h3>
                <span className={styles.infoText}>
                  {user.description ||
                    "Пользователь не указал информации о себе"}
                </span>
              </div>
              {user.role === "booster" && (
                <>
                  <div className={styles.reviews}>
                    <h4 className={styles.reviewsTitle}>Последние отзывы</h4>
                    <div className={styles.reviewsList}>
                      <div className={styles.reviewItem}>
                        <span className={styles.reviewName}>
                          {user.nickname}
                        </span>
                        <div className={styles.ratingStars}>
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                        </div>
                        <span className={styles.reviewText}>
                          Обратился в эту компанию для повышения рейтинга в Dota
                          2. Ребята справились на отлично, не зря потратил
                          деньги. Теперь я в топе рейтинга
                        </span>
                      </div>
                      <div className={styles.reviewItem}>
                        <span className={styles.reviewName}>Констатин</span>
                        <div className={styles.ratingStars}>
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                          <ImageNotDraggable
                            src={star}
                            alt="star"
                            className={styles.reviewStar}
                          />
                        </div>
                        <span className={styles.reviewText}>
                          Обратился в эту компанию для повышения рейтинга в Dota
                          2. Ребята справились на отлично, не зря потратил
                          деньги. Теперь я в топе рейтинга
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.experience}>
                    <div className={styles.experienceItem}>
                      <h2 className={styles.experienceBold}>102</h2>
                      <span className={styles.experienceText}>
                        Выполненных заказов
                      </span>
                    </div>
                    <div className={styles.experienceItem}>
                      <h2 className={styles.experienceBold}>34 месяца</h2>
                      <span className={styles.experienceText}>
                        Средний рейтинг бустера
                      </span>
                    </div>
                    <div className={styles.experienceItem}>
                      <h2 className={styles.experienceBold}>4.7</h2>
                      <span className={styles.experienceText}>
                        Средний рейтинг бустера
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  try {
    const res = await axiosInstance.get("users/all");

    return { paths: res.data.ids, fallback: true };
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

    const userId: string = params.userId as string;

    const res: AxiosResponse = await axiosInstance.get(`users/by_id/${userId}`);

    return {
      props: {
        user: res.data.user,
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

export default Booster;

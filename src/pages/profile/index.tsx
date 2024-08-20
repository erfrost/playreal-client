import BreadcrumbNav from "@/components/BreadcrumbNav";
import ProfileOffer from "@/components/ProfileOffer";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import { toastError } from "@/lib/toastifyActions";
import { User } from "@/models/User.model";
import styles from "@/styles/profile.module.css";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import noAvatar from "public/noAvatar.png";

interface ProfileProps {
  user: User | undefined;
  error: string | undefined;
}
const Profile = ({ user, error }: ProfileProps) => {
  useEffect(() => {
    if (error) toastError(error);
  }, []);

  return (
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
                path: "/profile",
              },
            ]}
          />
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.info}>
                <ImageNotDraggable
                  src={user.avatar_url || noAvatar}
                  width={100}
                  height={100}
                  alt="avatar"
                  className={styles.avatar}
                />
                <div className={styles.infoContent}>
                  <div className={styles.statusContainer}>
                    <div className={styles.status}>God of boosting</div>
                  </div>
                  <h1 className={styles.nickname}>{user.nickname}</h1>
                </div>
              </div>
              {/* пока не надо
              <div className={styles.rankContainer}></div> */}
            </div>
            <div className={styles.offersContainer}>
              <h3 className={styles.offersTitle}>Ваши заказы</h3>
              <div className={styles.offersList}>
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
                <ProfileOffer />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req }: GetServerSidePropsContext = context;

    const accessToken: string | undefined = req.cookies.access_token;

    const res: AxiosResponse = await axiosInstance.get("user/profile", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return {
      props: {
        user: res.data.user,
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

export default Profile;

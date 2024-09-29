import styles from "@/styles/profileEdit.module.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";
import { toastError, toastSuccess, toastWarning } from "@/lib/toastifyActions";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import { User } from "@/models/User.model";
import noAvatar from "/public/noAvatar.png";
import passwordShow from "/public/icons/passwordShow.svg";
import passwordHide from "/public/icons/passwordHide.svg";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { GameInfo } from "@/models/Game.model";
import GamesSelect from "@/components/GamesSelect";
import uploadImage from "@/api/files/uploadImage";
import ProfileEditPageSEO from "@/SEO/ProfileEditPageSEO";

interface Password {
  value: string;
  isShow: boolean;
}

interface ProfileEditProps {
  user: User | undefined;
  games: GameInfo[] | undefined;
  error: string | undefined;
}
const ProfileEdit = ({ user, games, error }: ProfileEditProps) => {
  const [avatar, setAvatar] = useState<string>(user?.avatar_url || "");
  const [nickname, setNickname] = useState<string>(user?.nickname || "");
  const [description, setDescription] = useState<string>(
    user?.description || ""
  );
  const [selectedGames, setSelectedGames] = useState<string[]>(
    user?.games || []
  );
  const [password, setPassword] = useState<Password>({
    value: "",
    isShow: false,
  });
  const [repeatPassword, setRepeatPassword] = useState<Password>({
    value: "",
    isShow: false,
  });

  useEffect(() => {
    if (error) toastError(error);
  }, []);

  const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files![0];
    if (!file) return;

    const newImage: string = await uploadImage(file);
    setAvatar(newImage);
  };

  const onPasswordChange = (
    value: string,
    setState: Dispatch<SetStateAction<Password>>
  ) => {
    const filteredValue: string = value.replace(
      /[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`\\|-]/g,
      ""
    );

    setState((prevState: Password) => ({
      ...prevState,
      value: filteredValue,
    }));
  };

  const onSave = async () => {
    try {
      if (password.value !== repeatPassword.value) {
        return toastWarning("Пароли не совпадают");
      }

      await axiosInstance.post("users/profile/update", {
        nickname,
        description,
        avatar_url: avatar,
        password: password.value,
        games: selectedGames,
      });

      toastSuccess("Успешно");
    } catch (error: any) {
      toastError(
        error?.response?.data?.message ||
          "При обновлении данных произошла ошибка"
      );
    }
  };

  if (!user) return;

  return (
    <>
      <ProfileEditPageSEO />
      <div className={styles.container}>
        <BreadcrumbNav
          theme="dark"
          routes={[
            {
              title: "Главная",
              path: "/",
            },
            {
              title: "Профиль",
              path: "/profile",
            },
            {
              title: "Редактирование",
              path: "/profile/edit",
            },
          ]}
        />
        <div className={styles.avatarContainer}>
          <ImageNotDraggable
            src={avatar || noAvatar}
            width={100}
            height={100}
            alt="avatar"
            className={styles.avatar}
          />
          <input
            className={styles.avatarInput}
            type="file"
            onChange={onAvatarChange}
          />
        </div>
        <input
          className={styles.input}
          placeholder="Никнейм"
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value: string = e.target.value;
            const filteredValue: string = value.replace(
              /[^a-zA-Zа-яА-Я0-9]/g,
              ""
            );
            setNickname(filteredValue);
          }}
        />
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Расскажите о себе"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
        {user.role === "booster" && games && (
          <>
            <span className={styles.text}>Игры</span>
            <GamesSelect
              games={games}
              selectedGames={selectedGames}
              setSelectedGames={setSelectedGames}
            />
          </>
        )}
        <span className={styles.text}>Смена пароля</span>
        <div className={styles.form}>
          <input
            className={`${styles.input} ${styles.passwordInput}`}
            placeholder="Новый пароль"
            type={password.isShow ? "text" : "password"}
            value={password.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onPasswordChange(e.target.value, setPassword)
            }
          />
          <ImageNotDraggable
            src={password.isShow ? passwordShow : passwordHide}
            alt="icon"
            className={styles.passwordIcon}
            onClick={() =>
              setPassword((prevState: Password) => ({
                ...prevState,
                isShow: !prevState.isShow,
              }))
            }
          />
        </div>
        <div className={styles.form}>
          <input
            className={`${styles.input} ${styles.passwordInput}`}
            placeholder="Повторите новый пароль"
            type={repeatPassword.isShow ? "text" : "password"}
            value={repeatPassword.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onPasswordChange(e.target.value, setRepeatPassword)
            }
          />
          <ImageNotDraggable
            src={repeatPassword.isShow ? passwordShow : passwordHide}
            alt="icon"
            className={styles.passwordIcon}
            onClick={() =>
              setRepeatPassword((prevState: Password) => ({
                ...prevState,
                isShow: !prevState.isShow,
              }))
            }
          />
        </div>
        <button className={styles.btn} onClick={onSave}>
          Сохранить изменения
        </button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req }: GetServerSidePropsContext = context;

    const accessToken: string | undefined = req.cookies.access_token;

    const profile: AxiosResponse = await axiosInstance.get("users/profile", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const games: AxiosResponse = await axiosInstance.get("games/all");

    return {
      props: {
        user: profile.data.user,
        games: games.data.games,
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

export default ProfileEdit;

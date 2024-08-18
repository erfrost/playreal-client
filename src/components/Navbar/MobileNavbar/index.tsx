import styles from "./index.module.css";
import PrimaryBtn from "@/components/PrimaryBtn";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import catalogIcon from "public/icons/catalogBtn.svg";
import Skeleton from "@/components/ui/Skeleton";
import AuthButtonWithDialog from "../ui/AuthButtonWithDialog";
import MenuWithButton from "../ui/MenuWithButton";
import CartButtonWithSlider from "../ui/CartButtonWithSlider";
import searchIcon from "public/icons/searchIconMobile.svg";
import Search from "../ui/Search";
import CatalogList from "../ui/CatalogList";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import { deleteCookie } from "cookies-next";
import { UserInfo } from "@/models/User.model";
import noAvatar from "public/noAvatar.png";
import { GameWithServices } from "@/models/Game.model";
import { useRecoilValue } from "recoil";
import { authIsPendingState } from "@/storage/atoms";

interface MobileNavbarProps {
  games: GameWithServices[];
  user: UserInfo | null;
  setUser: Dispatch<SetStateAction<UserInfo | null>>;
}
const MobileNavbar = ({ games, user, setUser }: MobileNavbarProps) => {
  const [isOpenInput, setIsOpenInput] = useState<boolean>(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);

    deleteCookie("access_token");
    deleteCookie("refresh_token");
    deleteCookie("user_id");
  };

  return (
    <nav className={styles.container}>
      <div className={styles.left}>
        <div>
          <PrimaryBtn
            className={styles.catalogBtn}
            onClick={() => setIsOpenCatalog((prevState) => !prevState)}
          >
            <ImageNotDraggable
              src={catalogIcon}
              alt="icon"
              className={`${styles.catalogIcon} ${
                isOpenCatalog && styles.openCatalogIcon
              }`}
            />
          </PrimaryBtn>
          {isOpenCatalog && (
            <CatalogList games={games} setIsOpen={setIsOpenCatalog} />
          )}
        </div>
        <ImageNotDraggable
          src={searchIcon}
          alt="icon"
          className={`${styles.searchIcon} ${
            isOpenInput && styles.displayNone
          }`}
          onClick={() => setIsOpenInput(true)}
        />
      </div>

      {isOpenInput ? (
        <Search isMobile isOpen={isOpenInput} setIsOpenInput={setIsOpenInput} />
      ) : (
        <a href="/" className={styles.logoContainer}>
          <ImageNotDraggable
            src="/playreal-logo.svg"
            alt="playreal logo"
            height={27}
            width={122}
            className={styles.logo}
          />
        </a>
      )}

      <div className={styles.profile}>
        {isLoading ? (
          <div className={styles.skeletons}>
            <Skeleton className={styles.skeleton1} />
            <Skeleton className={styles.skeleton2} />
            <Skeleton className={styles.skeleton3} />
          </div>
        ) : (
          <>
            {user ? (
              <div className={styles.userContainer}>
                <ImageNotDraggable
                  src={user.avatar_url || noAvatar}
                  width={48}
                  height={48}
                  alt="user avatar"
                  className={styles.avatar}
                />

                <MenuWithButton logout={logout} />
              </div>
            ) : (
              <AuthButtonWithDialog />
            )}
          </>
        )}
        <CartButtonWithSlider />
      </div>
    </nav>
  );
};

export default MobileNavbar;

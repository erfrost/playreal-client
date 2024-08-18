import { useEffect, useState } from "react";
import MenuWithButton from "./ui/MenuWithButton";
import AuthButtonWithDialog from "./ui/AuthButtonWithDialog";
import CartButtonWithSlider from "./ui/CartButtonWithSlider";
import catalogIcon from "public/icons/catalogBtn.svg";
import Search from "./ui/Search";
import styles from "./index.module.css";
import PrimaryBtn from "../PrimaryBtn";
import MobileNavbar from "./MobileNavbar";
import Skeleton from "../ui/Skeleton";
import CatalogList from "./ui/CatalogList";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import { UserInfo } from "@/models/User.model";
import getBaseUserInfo from "@/api/user/getBaseUserInfo";
import { deleteCookie } from "cookies-next";
import noAvatar from "public/noAvatar.png";
import { GameWithServices } from "@/models/Game.model";
import getGamesWithServices from "@/api/games/getGamesWithServices";
import { useRecoilValue } from "recoil";
import { authIsPendingState } from "@/storage/atoms";

const Navbar = () => {
  const [games, setGames] = useState<GameWithServices[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(1920);
  const authIsPending = useRecoilValue(authIsPendingState);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      setGames(await getGamesWithServices());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setUser(await getBaseUserInfo());
    })();
  }, [authIsPending]);

  const logout = () => {
    setUser(null);

    deleteCookie("access_token");
    deleteCookie("refresh_token");
    deleteCookie("user_id");
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (screenWidth <= 825)
    return <MobileNavbar games={games} user={user} setUser={setUser} />;

  return (
    <nav className={styles.container}>
      <div className={styles.left}>
        <a href="/">
          <ImageNotDraggable
            src="/playreal-logo.svg"
            alt="playreal logo"
            height={27}
            width={122}
            className={styles.logo}
          />
        </a>
        <div className={styles.catalogRelative}>
          <PrimaryBtn
            className={styles.catalogBtn}
            onClick={() => setIsOpenCatalog((prevState) => !prevState)}
          >
            <ImageNotDraggable
              src={catalogIcon}
              alt="icon"
              style={{ userSelect: "none" }}
            />
            <span style={{ userSelect: "none" }}>Каталог</span>
          </PrimaryBtn>
          {isOpenCatalog && (
            <CatalogList games={games} setIsOpen={setIsOpenCatalog} />
          )}
        </div>
        <Search />
      </div>

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
                {screenWidth > 900 && (
                  <span className={styles.nickname}>{user.nickname}</span>
                )}
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
              <AuthButtonWithDialog setUser={setUser} />
            )}
          </>
        )}
        <CartButtonWithSlider />
      </div>
    </nav>
  );
};

export default Navbar;

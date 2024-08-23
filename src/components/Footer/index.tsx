import styles from "./index.module.css";
import FontMenu from "./ui/FontMenu";
import logo from "/public/playreal-logo.svg";
import vkIcon from "/public/icons/VK.svg";
import instagramIcon from "/public/icons/Instagram.svg";
import telegramIcon from "/public/icons/Telegram.svg";
import twitchIcon from "/public/icons/Twitch.svg";
import steamIcon from "/public/icons/Steam.svg";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="max-w-[95%] w-[95%] mx-auto mt-[120px] pb-[75px]">
      <div className={`${styles.content} flex justify-between`}>
        <Link href="/">
          <ImageNotDraggable
            src={logo}
            height={27}
            width={122}
            alt="image"
            className={styles.logo}
          />
        </Link>

        <div className={`${styles.links} flex gap-[52px]`}>
          <FontMenu>Безопасность</FontMenu>
          <FontMenu>Отзывы</FontMenu>
          <FontMenu>Опыт бустеров</FontMenu>
          <FontMenu>О нас</FontMenu>
          <FontMenu>Калькулятор</FontMenu>
        </div>

        <div className={`${styles.socials} flex gap-[21px]`}>
          <Link href="#">
            <ImageNotDraggable
              src={vkIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </Link>
          <Link href="#">
            <ImageNotDraggable
              src={instagramIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </Link>
          <Link href="#">
            <ImageNotDraggable
              src={telegramIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </Link>
          <Link href="#">
            <ImageNotDraggable
              src={twitchIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </Link>
          <Link href="#">
            <ImageNotDraggable
              src={steamIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

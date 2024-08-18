import styles from "./index.module.css";
import FontMenu from "./ui/FontMenu";
import logo from "/public/playreal-logo.svg";
import vkIcon from "/public/icons/VK.svg";
import instagramIcon from "/public/icons/Instagram.svg";
import telegramIcon from "/public/icons/Telegram.svg";
import twitchIcon from "/public/icons/Twitch.svg";
import steamIcon from "/public/icons/Steam.svg";
import ImageNotDraggable from "../ui/ImageNotDraggable";

const Footer = () => {
  return (
    <div className="max-w-[95%] w-[95%] mx-auto mt-[120px] pb-[75px]">
      <div className={`${styles.content} flex justify-between`}>
        <a href="/">
          <ImageNotDraggable
            src={logo}
            height={27}
            width={122}
            alt="image"
            className={styles.logo}
          />
        </a>

        <div className={`${styles.links} flex gap-[52px]`}>
          <FontMenu>Безопасность</FontMenu>
          <FontMenu>Отзывы</FontMenu>
          <FontMenu>Опыт бустеров</FontMenu>
          <FontMenu>О нас</FontMenu>
          <FontMenu>Калькулятор</FontMenu>
        </div>

        <div className={`${styles.socials} flex gap-[21px]`}>
          <a href="#">
            <ImageNotDraggable
              src={vkIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </a>
          <a href="#">
            <ImageNotDraggable
              src={instagramIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </a>
          <a href="#">
            <ImageNotDraggable
              src={telegramIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </a>
          <a href="#">
            <ImageNotDraggable
              src={twitchIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </a>
          <a href="#">
            <ImageNotDraggable
              src={steamIcon}
              height={23}
              width={23}
              alt="image"
              className={styles.socialIcon}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

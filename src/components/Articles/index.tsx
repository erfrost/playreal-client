import H4 from "../typography/H4";
import Subtitle from "../typography/Subtitle";
import ButtonPink from "./ui/ButtonPink";
import ArticleItem from "./ui/ArticleItem";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import Link from "next/link";

const Articles = () => {
  const [screenWidth, setScreenWidth] = useState<number>(1920);

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

  return (
    <>
      <div className={`${styles.container} ax-w-[1160px] mx-auto mt-[75px]`}>
        <div className={`${styles.content} relative`}>
          {screenWidth > 650 ? (
            <>
              <Subtitle className={`${styles.title} inline-block`}>
                Читайте наши статьи
              </Subtitle>
              <Link href="#">
                <H4
                  className={`absolute bottom-0 right-[20px] cursor-[pointer]`}
                >
                  Все статьи
                </H4>
              </Link>
              <ImageNotDraggable
                className={`absolute bottom-[2px] right-0 cursor-[pointer]`}
                src="./chevron-right.svg"
                height={21}
                width={21}
                alt="image"
              />
              <p className={`${styles.subtitle} text-[15px] mt-[20px]`}>
                Учим и рассказываем как увеличивать свои скилы
              </p>
            </>
          ) : (
            <>
              <Subtitle className={`${styles.title} inline-block`}>
                Читайте наши статьи
              </Subtitle>
              <p className={`${styles.subtitle} text-[15px] mt-[20px]`}>
                Учим и рассказываем как увеличивать свои скилы
              </p>
              <div className={styles.allArticlesBtn}>
                <H4
                  className={` absolute bottom-0 right-[20px] cursor-[pointer]`}
                >
                  Все статьи
                </H4>
                <ImageNotDraggable
                  className={`absolute bottom-[2px] right-0 cursor-[pointer]`}
                  src="./chevron-right.svg"
                  height={21}
                  width={21}
                  alt="image"
                />
              </div>
            </>
          )}
        </div>
        <div className={`${styles.buttonGroup} my-[30px] flex gap-[13px]`}>
          <ButtonPink className={``}>ALL</ButtonPink>
          <ButtonPink className={`focus`}>DOTA 2</ButtonPink>
          <ButtonPink className={`focus`}>VALORANT</ButtonPink>
          <ButtonPink className={`focus`}>LOL</ButtonPink>
          <ButtonPink className={`focus`}>OWERWATCH</ButtonPink>
          <ButtonPink className={`focus`}>CoD</ButtonPink>
          <ButtonPink className={`focus`}>CS:GO</ButtonPink>
          {screenWidth <= 665 && <div style={{ paddingRight: "3%" }}></div>}
        </div>
        <div className={`${styles.items} flex flex-colms-3 gap-10`}>
          <ArticleItem />
          <ArticleItem />
          <ArticleItem marginRight="20px" />
        </div>
      </div>
    </>
  );
};

export default Articles;

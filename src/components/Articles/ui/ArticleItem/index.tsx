import styles from "./index.module.css";
import Insc from "@/components/typography/Inscriptions";
import H4 from "@/components/typography/H4";
import ButtonGr from "../ButtonGr";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import Link from "next/link";

interface ArticleItemProps {
  marginRight?: string;
}
const ArticleItem = ({ marginRight }: ArticleItemProps) => {
  return (
    <>
      <Link
        href="#"
        className={`${styles.container} w-[360px] h-[495px] bg-[#F5F5F5] rounded-[15px]`}
        style={marginRight ? { marginRight: "50px" } : {}}
      >
        <ImageNotDraggable
          width={360}
          height={300}
          alt="image"
          src="./Image.svg"
          className={styles.image}
        />
        <div className={`${styles.texts} mx-[22px] mt-[20px] grid`}>
          <div className="relative">
            <ButtonGr>CS:GO</ButtonGr>
            <Insc
              className={`w-[60px] absolute top-[3px] left-[70px] text-black`}
            >
              5 min read
            </Insc>
          </div>

          <div className="mt-[15px]">
            <H4 className={`!text-[#333333] mb-[8px]`}>
              Как нагибать в майнкрафте
            </H4>
            <p>
              Сегодня мы расскажем как стать самым крутым в самой сложной игре
              гения Кодзимы
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArticleItem;

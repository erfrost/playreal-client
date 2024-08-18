import Name from "../Name";
import Game from "../Game";
import Stars from "../Stars";
import ReviewText from "../ReviewText";
import styles from "./index.module.css";

const Review = () => {
  return (
    <div
      className="review-item w-[360px] h-[168px] rounded-[15px] p-px items-center justify-center 
                  bg-gradient-to-r from-[#1A2E93] to-[#3592FF]"
    >
      <div className="bg-white w-full h-full rounded-[15px] relative">
        <Game className={`absolute left-[15px] top-[15px] text-[#333333]`}>
          Dota 2
        </Game>
        <Name
          className={`absolute left-[15px] top-[30px] text-[#333333] !text-[15px] font-bold`}
        >
          Константин
        </Name>
        <Stars />
        <ReviewText
          className={`${styles.text} absolute left-[15px] bottom-[15px] font-normal leading-[22.58px]`}
        >
          Обратился в эту компанию для повышения рейтинга в Dota 2. Ребята
          справились на отлично, не зря потратил деньги. Теперь я в топе
          рейтинга
        </ReviewText>
      </div>
    </div>
  );
};

export default Review;

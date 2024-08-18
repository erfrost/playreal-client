import styles from "./index.module.css";

const SecondCard = () => {
  return (
    <>
      <div
        className={`${styles.container} flex flex-row-3 gap-[20px] justify-between w-full`}
      >
        <div className="bg-[#F5F5F5] rounded-[10px] h-[165px]  w-full">
          <div
            className={`${styles.content} flex flex-col justify-around p-[20px] h-full p-[20px]`}
          >
            <h2 className="text-[50px] font-bold">1 200+</h2>
            <p className="text-[15px] -mt-[40px]">Исполненных заказов</p>
          </div>
        </div>

        <div className="bg-[#F5F5F5] rounded-[10px] h-[165px]  w-full">
          <div
            className={`${styles.content} flex flex-col justify-around p-[20px] h-full p-[20px]`}
          >
            <h2 className="text-[50px] font-bold">4.8</h2>
            <p className="text-[15px] -mt-[40px]">
              Средний рейтинг на Trustpilot
            </p>
          </div>
        </div>

        <div className="bg-[#F5F5F5] rounded-[10px] h-[165px]  w-full">
          <div
            className={`${styles.content} flex flex-col justify-around p-[20px] h-full p-[20px]`}
          >
            <h2 className="text-[50px] font-bold">600</h2>
            <p className="text-[15px] -mt-[40px]">Топовых бустеров</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondCard;

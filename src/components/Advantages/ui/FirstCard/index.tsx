import styles from "./index.module.css";
import icon from "/public/Frame 176.svg";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";

const FirstCard = () => {
  return (
    <>
      <div
        className={`${styles.container} flex flex-row-4 gap-[20px] justify-between w-full mb-[30px]`}
      >
        <div className="bg-[#F5F5F5] rounded-[10px] h-[165px]  w-full">
          <div className="flex flex-col justify-between p-[20px]  h-full">
            <ImageNotDraggable
              width={45}
              height={45}
              alt="image"
              src={icon}
              style={{ userSelect: "none" }}
            />
            <p className="text-[18px] leading-[20px] font-bold pt-[50px]">
              Мы круче всех
            </p>
          </div>
        </div>

        <div className="bg-[#F5F5F5] rounded-[10px] h-[165px]  w-full">
          <div className="flex flex-col justify-between p-[20px]  h-full">
            <ImageNotDraggable
              width={45}
              height={45}
              alt="image"
              src={icon}
              style={{ userSelect: "none" }}
            />
            <p className="text-[18px] leading-[20px] font-bold pt-[50px]">
              Мы круче всех
            </p>
          </div>
        </div>

        <div className="bg-[#F5F5F5] rounded-[10px] h-[165px]  w-full">
          <div className="flex flex-col justify-between p-[20px]  h-full">
            <ImageNotDraggable
              width={45}
              height={45}
              alt="image"
              src={icon}
              style={{ userSelect: "none" }}
            />
            <p className="text-[18px] leading-[20px] font-bold pt-[50px]">
              Мы круче всех
            </p>
          </div>
        </div>

        <div className="bg-[#F5F5F5] rounded-[10px] h-[165px]  w-full">
          <div className="flex flex-col justify-between p-[20px]  h-full">
            <ImageNotDraggable
              width={45}
              height={45}
              alt="image"
              src={icon}
              style={{ userSelect: "none" }}
            />
            <p className="text-[18px] leading-[20px] font-bold pt-[50px]">
              Мы круче всех
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstCard;

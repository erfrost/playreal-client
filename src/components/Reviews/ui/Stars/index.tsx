import starIcon from "/public/star.svg";
import ImageNotDraggable from "@/components/ui/ImageNotDraggable";

const Stars = () => {
  return (
    <div
      className={`flex items-center gap-[2px] top-[35px] absolute top-[23px] right-[15px]`}
    >
      <ImageNotDraggable
        src={starIcon}
        alt="star"
        style={{ userSelect: "none" }}
      />
      <ImageNotDraggable
        src={starIcon}
        alt="star"
        style={{ userSelect: "none" }}
      />
      <ImageNotDraggable
        src={starIcon}
        alt="star"
        style={{ userSelect: "none" }}
      />
      <ImageNotDraggable
        src={starIcon}
        alt="star"
        style={{ userSelect: "none" }}
      />
      <ImageNotDraggable
        src={starIcon}
        alt="star"
        style={{ userSelect: "none" }}
      />
    </div>
  );
};

export default Stars;

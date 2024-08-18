import styles from "./index.module.css";
import arrow from "/public/icons/accordionArrowBottom.svg";
import ImageNotDraggable from "../ui/ImageNotDraggable";
import { Requirement } from "@/models/Service.model";

interface AccordionProps {
  requirement: Requirement;
}
const Accordion = ({ requirement }: AccordionProps) => {
  const handleOpen = () => {
    const toogle: HTMLDivElement | null = document.getElementById(
      `header-${requirement._id}`
    ) as HTMLDivElement;
    const arrow: HTMLImageElement | null = document.getElementById(
      `arrow-${requirement._id}`
    ) as HTMLImageElement;
    const accordion: HTMLDivElement | null = document.getElementById(
      `content-${requirement._id}`
    ) as HTMLDivElement;
    if (!toogle || !arrow || !accordion) return;

    if (
      window.getComputedStyle(accordion, null).getPropertyValue("height") ===
      "0px"
    ) {
      toogle.style.backgroundColor = "#F5F5F5";

      accordion.style.height = `${accordion.scrollHeight + 10}px`;
      accordion.style.borderBottom = "10px solid transparent";

      arrow.style.transform = "rotate(180deg)";
      arrow.style.marginTop = "0";
    } else {
      toogle.style.backgroundColor = "transparent";

      accordion.style.height = `${accordion.scrollHeight}px`;
      window.getComputedStyle(accordion, null).getPropertyValue("height");
      accordion.style.height = "0";
      accordion.style.borderBottom = "0 solid transparent";

      arrow.style.transform = "none";
      arrow.style.marginTop = "2px";
    }

    accordion.addEventListener("transitionend", () => {
      if (accordion.style.height !== "0px") {
        accordion.style.height = "auto";
      }
    });

    return accordion.removeEventListener("transitionend", () => {
      if (accordion.style.height !== "0px") {
        accordion.style.height = "auto";
      }
    });
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        id={`header-${requirement._id}`}
        onClick={handleOpen}
      >
        <h4 className={styles.title}>{requirement.title}</h4>
        <button className={styles.openBtn}>
          <ImageNotDraggable
            src={arrow}
            id={`arrow-${requirement._id}`}
            alt="arrow"
            className={styles.arrow}
          />
        </button>
      </div>
      <div className={styles.content} id={`content-${requirement._id}`}>
        {requirement.text}
      </div>
    </div>
  );
};

export default Accordion;

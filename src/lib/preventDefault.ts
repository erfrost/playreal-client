import { DragEvent } from "react";

const preventDefault = (event: DragEvent<HTMLImageElement>) => {
  event.preventDefault();
};

export default preventDefault;

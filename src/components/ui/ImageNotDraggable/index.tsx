import preventDefault from "@/lib/preventDefault";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";

interface ImageNotDraggableProps extends Omit<ImageProps, "src"> {
  src: string | StaticImport;
}

const ImageNotDraggable = (props: ImageNotDraggableProps) => {
  return (
    <Image
      {...props}
      style={{ userSelect: "none" }}
      draggable={false}
      onDragStart={preventDefault}
      onContextMenu={preventDefault}
    />
  );
};

export default ImageNotDraggable;

import { forwardRef, RefObject } from "react";
import { Sprite, Stage } from "@pixi/react";

import TextLayer from "../TextLayer";
// import BunnyAnimation from "../BunnyAnimation";
import { SlideInterface, TextLayerInterface } from "@/utils/types";

interface PixiSlideProps {
  slideDetail: SlideInterface;
}

const PixiSlide = forwardRef((props: PixiSlideProps, ref) => {
  const { slideDetail } = props;
  const slideType = slideDetail.background.type;

  const text = slideDetail.layers.filter((item) => item.type === "text");
  return (
    <Stage
      ref={ref as RefObject<Stage>}
      options={{ backgroundColor: "#EAECF0EE" }}
      width={400}
      height={700}
    >
      {slideType === "image" && (
        <Sprite
          image={slideDetail.background.imageUrl}
          width={400}
          height={700}
        />
      )}
      {/* <BunnyAnimation /> */}
      {text && text?.length > 0 && (
        <TextLayer textDetails={text as TextLayerInterface[]} />
      )}
    </Stage>
  );
});

PixiSlide.displayName = "PixiSlide"; // Add display name

export default PixiSlide;

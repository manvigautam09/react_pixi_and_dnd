import { MutableRefObject, useRef } from "react";
import * as PIXI from "pixi.js";
import { Stage, Sprite, Text } from "@pixi/react";

import { SlideType } from "@/utils/types";

interface PixiCanvasProps {
  slideData: SlideType;
  stageRef: MutableRefObject<any>;
}

const PixiCanvas = ({ slideData, stageRef }: PixiCanvasProps) => {
  const slideType = slideData?.type;
  const text = slideData?.text;
  return (
    <Stage
      ref={stageRef}
      options={{ backgroundColor: "#EAECF0EE" }}
      width={400}
      height={700}
    >
      {slideType === "image" && (
        <Sprite
          image={`http://localhost:3005/slide-image?name=${slideData?.asset}`}
          width={400}
          height={700}
        />
      )}

      {text &&
        text?.length > 0 &&
        text.map((t) => (
          <Text
            key={t.id}
            text={t.title}
            x={t.position?.x || 100}
            y={t.position?.y || 100}
            style={
              new PIXI.TextStyle({
                align: t.style?.align || "center",
                fontFamily:
                  t.style?.fontFamily ||
                  '"Source Sans Pro", Helvetica, sans-serif',
                fontSize: t.style?.fontSize || 20,
                fontWeight: t.style?.fontWeight || "400",
                fill: t.style?.fill || "#000", // can also add gradient
                stroke: t.style?.stroke || "#000",
                strokeThickness: t.style?.strokeThickness || 0,
                letterSpacing: t.style?.letterSpacing || 1,
                dropShadow: t.style?.dropShadow || false,
                dropShadowColor: t.style?.dropShadowColor || "#000",
                dropShadowBlur: t.style?.dropShadowBlur || 4,
                dropShadowAngle: t.style?.dropShadowAngle || Math.PI / 6,
                dropShadowDistance: t.style?.dropShadowDistance || 10,
                wordWrap: t.style?.wordWrap || true,
                wordWrapWidth: t.style?.wordWrapWidth || 440,
              })
            }
            angle={t.rotate || 0}
          />
        ))}
    </Stage>
  );
};
export default PixiCanvas;
